/**
 * Build-time prerendering.
 *
 * Renders every public route of the React SPA through headless Chrome and
 * writes the resulting HTML to dist/{route}/index.html. Netlify serves
 * those files before falling through to the SPA fallback, so a fresh page
 * load for any URL returns real semantic HTML (h1, h2, p, links, schema)
 * instead of an empty <div id="root"></div>.
 *
 * This dramatically improves SEO for non-JS-executing crawlers
 * (Screaming Frog free, GPTBot, ClaudeBot, CCBot, most LLM scrapers,
 * legacy spiders) which couldn't see any content before.
 *
 * Architecture:
 *   1. Discover routes from the same data sources as the sitemap generator
 *      (static list + trades + locations + projects + blog).
 *   2. Spin up a tiny static file server on a random port that serves the
 *      already-built dist/ directory (with SPA fallback to index.html).
 *   3. Launch headless Chrome via puppeteer-core, pointed at the system
 *      Chrome install (Windows path locally, Netlify's Chrome path in CI).
 *   4. Open N tabs and process routes in parallel. For each route:
 *        - navigate, wait until network is idle
 *        - capture full rendered HTML
 *        - write to dist/{route}/index.html
 *   5. Tear down browser + server.
 *
 * Failure mode: errors are logged but do NOT fail the build. The site
 * still works as a SPA; failed routes just don't get prerendered HTML.
 */

import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname    = path.dirname(fileURLToPath(import.meta.url));
const projectRoot  = path.resolve(__dirname, '..');
const DIST_DIR     = path.join(projectRoot, 'dist');
const CONCURRENCY  = 5;
const PAGE_TIMEOUT = 25_000;

// Using the full `puppeteer` package (not `puppeteer-core`) — it ships its
// own Chromium that npm install downloads, so prerender works identically
// on Windows, macOS, Linux, and Netlify's build image without depending on
// a system Chrome install. The earlier puppeteer-core + system Chrome
// approach silently failed in Netlify CI because no Chrome was present at
// the expected paths, which left every URL serving the unprerendered SPA
// fallback.

// ─── Route discovery (mirrors scripts/generate-sitemap.mjs) ─────────────
const STATIC_ROUTES = [
    '/', '/about', '/services', '/partnerships', '/where', '/contact',
    '/careers', '/faq', '/privacy', '/terms', '/portfolio',
    '/portfolio/commercial', '/portfolio/residential', '/blog',
];
const TRADES = [
    'roofing', 'stucco', 'general-contracting', 'hvac', 'plumbing',
    'res-const', 'com-const', 'metals', 'masonry', 'fencing',
    'gutters', 'land-dev',
];

const discoverRoutes = () => {
    const routes = [...STATIC_ROUTES, ...TRADES.map(t => `/services/${t}`)];

    const locSrc = fs.readFileSync(path.join(projectRoot, 'src/data/locations.js'), 'utf8');
    for (const m of locSrc.matchAll(/\bid:\s*['"]([a-z0-9-]+)['"]/g)) {
        routes.push(`/locations/${m[1]}`);
    }

    const projSrc = fs.readFileSync(path.join(projectRoot, 'src/data/projects.js'), 'utf8');
    for (const m of projSrc.matchAll(/\bid:\s*['"]([a-z0-9-]+)['"]\s*,\s*name:/g)) {
        routes.push(`/portfolio/${m[1]}`);
    }

    const blogSrc = fs.readFileSync(path.join(projectRoot, 'src/data/blog.js'), 'utf8');
    for (const m of blogSrc.matchAll(/\bslug:\s*['"]([a-z0-9-]+)['"]/g)) {
        routes.push(`/blog/${m[1]}`);
    }

    return routes;
};

// ─── Minimal static file server that mimics Netlify's SPA fallback ──────
const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js':   'application/javascript',
    '.mjs':  'application/javascript',
    '.css':  'text/css',
    '.json': 'application/json',
    '.svg':  'image/svg+xml',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.woff2':'font/woff2',
    '.woff': 'font/woff',
    '.ico':  'image/x-icon',
    '.xml':  'application/xml',
    '.txt':  'text/plain',
};

const startServer = () => new Promise((resolve) => {
    const server = http.createServer(async (req, res) => {
        try {
            const url = new URL(req.url, 'http://localhost');
            let rel = decodeURIComponent(url.pathname);
            // Strip leading slash for join, then resolve under dist
            let candidate = path.join(DIST_DIR, rel);
            // If the request resolves to a directory, serve its index.html
            if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
                candidate = path.join(candidate, 'index.html');
            }
            // If the file exists as-is, serve it
            if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
                const ext = path.extname(candidate).toLowerCase();
                res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
                res.end(await fsp.readFile(candidate));
                return;
            }
            // SPA fallback — return the root index.html for any unmatched route
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(await fsp.readFile(path.join(DIST_DIR, 'index.html')));
        } catch (err) {
            res.statusCode = 500;
            res.end(String(err.message));
        }
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
});

// ─── Per-route prerender ────────────────────────────────────────────────
const renderRoute = async (page, baseUrl, route) => {
    const url = `${baseUrl}${route}`;
    // networkidle2 (max 2 in-flight requests) instead of networkidle0 — the
    // home page hero video keeps a streaming connection open that would never
    // hit true zero requests within the timeout.
    await page.goto(url, { waitUntil: 'networkidle2', timeout: PAGE_TIMEOUT });

    // Belt-and-suspenders: also wait until <h1> or <h2> appears in #root
    // so we don't capture a still-loading skeleton.
    try {
        await page.waitForFunction(() => {
            const root = document.getElementById('root');
            return root && (root.querySelector('h1') || root.querySelector('h2') || root.textContent.trim().length > 200);
        }, { timeout: 8_000 });
    } catch {
        // Acceptable — some routes (NotFound, edge cases) may not have h1/h2.
        // We'll still capture whatever HTML React produced.
    }

    const html = await page.content();
    const outDir = path.join(DIST_DIR, route === '/' ? '' : route.replace(/^\//, ''));
    const outFile = path.join(outDir, 'index.html');
    await fsp.mkdir(outDir, { recursive: true });
    await fsp.writeFile(outFile, html, 'utf8');
    return outFile;
};

// ─── Main ───────────────────────────────────────────────────────────────
(async () => {
    if (!fs.existsSync(DIST_DIR)) {
        console.error('✗ dist/ not found — run `vite build` first.');
        process.exit(0); // Don't fail the build; just skip prerendering.
    }

    const routes = discoverRoutes();
    console.log(`Prerendering ${routes.length} routes via bundled Chromium`);

    const server = await startServer();
    const port = server.address().port;
    const baseUrl = `http://127.0.0.1:${port}`;

    // No executablePath — puppeteer auto-uses its bundled Chromium.
    // --no-sandbox is required in CI environments (Netlify build container).
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });

    const queue = [...routes];
    let done = 0;
    let failed = 0;
    const t0 = Date.now();

    const workers = Array.from({ length: CONCURRENCY }, async () => {
        const page = await browser.newPage();
        // Quieter logging; some routes warn about missing favicons etc.
        page.on('pageerror', () => {});
        page.on('requestfailed', () => {});
        while (queue.length > 0) {
            const route = queue.shift();
            if (!route) break;
            try {
                await renderRoute(page, baseUrl, route);
                done++;
                if (done % 10 === 0 || done === routes.length) {
                    console.log(`  ${done}/${routes.length} (${failed} failed)`);
                }
            } catch (err) {
                failed++;
                console.warn(`  ✗ ${route} — ${err.message}`);
            }
        }
        await page.close();
    });

    await Promise.all(workers);
    await browser.close();
    server.close();

    const seconds = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`✓ Prerender complete: ${done} succeeded, ${failed} failed in ${seconds}s`);
})();
