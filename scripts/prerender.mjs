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
// Note: `/` is intentionally OMITTED from this list. The home page has a
// comprehensive <noscript> fallback in index.html (header, all 12 trades,
// 5 office locations, trust credentials, contact) that crawlers without JS
// see, so it gets near-equivalent SEO without the perf cost of
// prerendering. Prerendering the home page tanked Lighthouse Performance
// from 94 to 52 in production because the full rendered DOM (hero +
// ScaleStats + TradeGrid + 30 partner-logo carousel + Accordion +
// ProjectsShowcase + SafetyStats + TestimonialsSection + SocialSection +
// QuoteCTA) is a heavy initial payload AND a costly hydrateRoot walk.
// Content pages don't have this problem — they're smaller and benefit
// proportionally more from real per-route HTML.
const STATIC_ROUTES = [
    '/about', '/services', '/partnerships', '/where', '/contact',
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

    // Remove the <noscript> fallback AND any HTML comments BEFORE capturing
    // page.content(). Doing this via DOM manipulation (instead of regex on
    // the captured string) is critical: a previous regex-based approach
    // matched <noscript> text inside an HTML comment in index.html, which
    // greedily stripped from the comment's mid-sentence "<noscript>" all
    // the way through the real noscript's closing </noscript> tag —
    // INCLUDING the comment's own --> terminator. That left an unclosed
    // <!-- in <body>, which made every HTML parser (Screaming Frog,
    // Googlebot, etc.) interpret the entire body content as comment text.
    // The h1/h2/p/etc. were in the bytes but unreachable to parsers,
    // which is why SF reported every body element as null while head
    // metadata came through fine.
    //
    // DOM-based removal can't have that failure mode — it operates on
    // parsed nodes, not on the source text.
    //
    // The home page (route '/') is NOT in STATIC_ROUTES so its index.html
    // is served un-prerendered and keeps the noscript fallback intact
    // for non-JS crawlers.
    await page.evaluate(() => {
        // Remove all <noscript> elements (redundant on prerendered pages
        // since they have real per-route content in #root).
        document.querySelectorAll('noscript').forEach((n) => n.remove());

        // Walk the DOM and remove HTML comments. Comments serve no
        // production purpose, take up bytes, and any structural error
        // in a comment (unclosed, weird text inside) can mis-parse the
        // surrounding document. Belt-and-suspenders cleanup.
        const walker = document.createTreeWalker(
            document,
            NodeFilter.SHOW_COMMENT,
            null
        );
        const comments = [];
        let node = walker.nextNode();
        while (node) {
            comments.push(node);
            node = walker.nextNode();
        }
        comments.forEach((c) => c.parentNode.removeChild(c));
    });

    let html = await page.content();

    // Safety net: strip any third-party script tags that snuck through
    // request interception (e.g. scripts injected by something OTHER than
    // a network request — inline scripts created by an extension or by a
    // script that ran before interception engaged). The legitimate
    // production-time GTM script tag (loaded by GoogleTagManager.jsx via
    // client-side createElement on real visits) is fine — it's not in
    // our source HTML and won't reappear here.
    html = html.replace(
        /<script[^>]*\s(?:src|data-src)="[^"]*(?:googletagmanager\.com|google-analytics\.com|googleadservices\.com|doubleclick\.net|facebook\.net|tiktok\.com)[^"]*"[^>]*>(?:[\s\S]*?<\/script>)?/g,
        ''
    );

    // Strip any leftover puppeteer localhost references (127.0.0.1:PORT)
    // that third-party scripts may have written into query strings before
    // we managed to block them.
    html = html.replace(/127\.0\.0\.1%3A\d+/g, '');
    html = html.replace(/127\.0\.0\.1:\d+/g, '');

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

    // Domains we don't want firing during prerender. Each of these injects
    // tracking pixels, conversion scripts, or analytics beacons into the DOM
    // that puppeteer then captures into the static HTML. The capture pollutes
    // every prerendered page with leftover localhost URLs (from puppeteer's
    // own dev server) and phantom conversion events that fire on every real
    // visitor. On the real visitor's browser, these scripts load fresh from
    // GTM after hydration, which is what we want.
    const THIRD_PARTY_BLOCKLIST = [
        'googletagmanager.com',
        'google-analytics.com',
        'analytics.google.com',
        'googleadservices.com',
        'doubleclick.net',
        'google.com/ads',
        'facebook.com',
        'facebook.net',
        'connect.facebook.net',
        'tiktok.com',
        'cse-media.b-cdn.net',  // hero video CDN — not needed for static capture
    ];

    const workers = Array.from({ length: CONCURRENCY }, async () => {
        const page = await browser.newPage();

        // Block third-party requests so they don't inject scripts/pixels
        // into the captured DOM. Same-origin requests (the React bundle,
        // images, CSS) load normally so the page renders correctly.
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            const url = req.url();
            if (THIRD_PARTY_BLOCKLIST.some((domain) => url.includes(domain))) {
                req.abort();
            } else {
                req.continue();
            }
        });

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

    // ── Home-page head + body injection ─────────────────────────────────
    // The home route ('/') is intentionally NOT prerendered (see the
    // STATIC_ROUTES note above — a prerendered home body tanked Lighthouse
    // because of the heavy hydrateRoot walk). That left dist/index.html
    // with an empty <head> for SEO purposes (no <title>, meta description,
    // or JSON-LD — all injected CLIENT-SIDE by SEO.jsx + SchemaMarkup.jsx)
    // AND an empty #root, so non-JS crawlers / AI search engines
    // (GPTBot/ClaudeBot/PerplexityBot) saw zero words of body content.
    //
    // Fix, in two parts, patched ONLY into dist/index.html (served solely
    // for '/'), so the 147 prerendered pages are untouched (no duplicate
    // metadata):
    //   1. HEAD: render '/' in headless Chrome, capture the React-hoisted
    //      <title>/meta/canonical + the Organization JSON-LD, splice before
    //      </head>.
    //   2. BODY: splice scripts/home-fallback.html (a ~650-word crawlable
    //      block, one H1 + section H2s) immediately before <div id="root">.
    //      It is off-screen (sr-only clip, not display:none) so crawlers
    //      count it but sighted users never see it (no flash, no CLS), and
    //      main.jsx removes #home-seo-content the instant React mounts so JS
    //      users never retain hidden duplicate text.
    // #root stays empty either way, so home still client-renders exactly as
    // before — ZERO runtime perf change.
    try {
        const homePage = await browser.newPage();
        await homePage.setRequestInterception(true);
        homePage.on('request', (req) => {
            const url = req.url();
            if (THIRD_PARTY_BLOCKLIST.some((d) => url.includes(d))) req.abort();
            else req.continue();
        });
        homePage.on('pageerror', () => {});
        homePage.on('requestfailed', () => {});

        await homePage.goto(`${baseUrl}/`, { waitUntil: 'networkidle2', timeout: PAGE_TIMEOUT });
        // Wait until SEO.jsx has hoisted the per-route <title> into <head>.
        await homePage.waitForFunction(
            () => document.title && document.title.includes('Canyon State'),
            { timeout: 8_000 },
        ).catch(() => {});

        // Extract exactly the tags SEO.jsx + SchemaMarkup.jsx add — and
        // nothing the static template already ships (charset, viewport,
        // icon, preloads, theme-color), so the splice can't duplicate them.
        // Head meta come from <head>; JSON-LD is queried document-wide
        // because React renders <script type="application/ld+json"> into
        // the body (it hoists title/meta/link to head, but not scripts).
        const headTags = await homePage.evaluate(() => {
            const headSel = [
                'title',
                'meta[name="title"]',
                'meta[name="description"]',
                'meta[name="robots"]',
                'meta[property^="og:"]',
                'meta[name^="twitter:"]',
                'link[rel="canonical"]',
            ].join(',');
            const headHtml = Array.from(document.head.querySelectorAll(headSel))
                .map((el) => el.outerHTML);
            const jsonLd = Array.from(
                document.querySelectorAll('script[type="application/ld+json"]'),
            ).map((el) => el.outerHTML);
            return [...headHtml, ...jsonLd].join('\n  ');
        });
        await homePage.close();

        if (headTags && headTags.includes('<title>')) {
            const indexPath = path.join(DIST_DIR, 'index.html');
            let indexHtml = await fsp.readFile(indexPath, 'utf8');

            // 1. HEAD — idempotent: only inject if not already present.
            if (!indexHtml.includes('data-home-seo')) {
                const block = `  <!-- data-home-seo: SEO/JSON-LD captured from the rendered home route at build time (scripts/prerender.mjs). The source index.html stays clean to avoid duplicate metadata on prerendered pages; this block lands only in the home shell, which is served only for '/'. -->\n  ${headTags}\n`;
                indexHtml = indexHtml.replace('</head>', `${block}</head>`);
                console.log('✓ Injected home-page <head> SEO + JSON-LD into dist/index.html');
            }

            // 2. BODY — splice the crawlable fallback before the root div.
            // Extract just the home-seo-content div (drop the dev-facing
            // comment at the top of the source file). We target the EXACT
            // empty container `<div id="root"></div>` (with its closing tag)
            // rather than the bare opening tag: the bare opening tag can also
            // appear as descriptive text and matching that would splice the
            // block into the wrong place. The empty-container string is
            // unique to the real mount point in the built output.
            const ROOT_MARKER = '<div id="root"></div>';
            if (!indexHtml.includes('id="home-seo-content"')) {
                const fallbackSrc = await fsp.readFile(
                    path.join(projectRoot, 'scripts/home-fallback.html'), 'utf8',
                );
                const start = fallbackSrc.indexOf('<div id="home-seo-content"');
                const fallbackDiv = start >= 0 ? fallbackSrc.slice(start).trim() : '';
                if (fallbackDiv && indexHtml.includes(ROOT_MARKER)) {
                    indexHtml = indexHtml.replace(
                        ROOT_MARKER,
                        `${fallbackDiv}\n  ${ROOT_MARKER}`,
                    );
                    console.log('✓ Injected crawlable home body into dist/index.html');
                } else {
                    console.warn('  ✗ Home body fallback not spliced (marker missing)');
                }
            }

            await fsp.writeFile(indexPath, indexHtml, 'utf8');
        } else {
            console.warn('  ✗ Home head capture returned nothing — dist/index.html left as-is');
        }
    } catch (err) {
        console.warn(`  ✗ Home head/body injection skipped — ${err.message}`);
    }

    await browser.close();
    server.close();

    const seconds = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`✓ Prerender complete: ${done} succeeded, ${failed} failed in ${seconds}s`);
})();
