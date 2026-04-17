#!/usr/bin/env node
/**
 * import-images.js  —  Canyon State image import tool
 *
 * Drop images into incoming/ → prompts for metadata → converts to .webp
 * Project images: ProjectName_City State.webp
 * Other images:   descriptive-name.webp
 *
 * Run: npm run import-images
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Config ───────────────────────────────────────────────────────────────────

const INCOMING_DIR   = path.join(__dirname, 'incoming');
const PROCESSED_DIR  = path.join(__dirname, 'incoming', 'processed');
const SUPPORTED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic']);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes) {
    if (bytes < 1024)            return `${bytes} B`;
    if (bytes < 1024 * 1024)     return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function prompt(rl, question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function ask(rl, question, validate) {
    while (true) {
        const ans = (await prompt(rl, question)).trim();
        if (!validate || validate(ans)) return ans;
        console.log('  ⚠️   Invalid input, please try again.');
    }
}

async function convertImage(srcBuffer, destPath) {
    await sharp(srcBuffer)
        .resize({ width: 2400, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(destPath);
}

// Returns a non-colliding path: if foo.webp exists → foo_2.webp → foo_3.webp ...
function uniqueDestPath(dir, filename) {
    const ext  = path.extname(filename);          // '.webp'
    const base = path.basename(filename, ext);    // 'Betty's Village_Las Vegas NV'
    let   candidate = path.join(dir, filename);
    let   counter   = 2;
    while (fs.existsSync(candidate)) {
        candidate = path.join(dir, `${base}_${counter}${ext}`);
        counter++;
    }
    return candidate;
}

// ─── Core: process one image ──────────────────────────────────────────────────

async function processImage(filePath, rl) {
    const filename    = path.basename(filePath);
    const ext         = path.extname(filename).toLowerCase();
    if (!SUPPORTED_EXTS.has(ext)) return;

    const originalSize = fs.statSync(filePath).size;

    console.log(`\n${'─'.repeat(60)}`);
    console.log(`📸  ${filename}  (${formatBytes(originalSize)})`);
    console.log(`${'─'.repeat(60)}\n`);

    // ── Image type ──
    console.log('  What type of image is this?\n');
    console.log('    1. Portfolio / Project Photo');
    console.log('    2. Team / People             → src/assets/team/');
    console.log('    3. Trades / Services         → src/assets/trades/');
    console.log('    4. About Page                → src/assets/about/');
    console.log('    5. Partners / Logos          → src/assets/Partners/');
    console.log('    6. General / Other           → src/assets/images/\n');

    const typeChoice = await ask(rl, '  Enter 1–6: ', v => /^[1-6]$/.test(v));
    const isProject  = typeChoice === '1';

    let finalFilename;
    let destinations = [];

    if (isProject) {
        // ── Project image flow ──
        console.log('\n  ── Project Photo ─────────────────────────────────────\n');

        const projectName = await ask(
            rl,
            '  Project name (e.g. Aquila Place): ',
            v => v.length > 0
        );

        const cityState = await ask(
            rl,
            '  City and state (e.g. Apache Junction AZ): ',
            v => v.length > 0
        );

        const cr = await ask(
            rl,
            '  Commercial or Residential? (C/R): ',
            v => /^[CcRr]$/.test(v)
        );
        const isCommercial = /^[Cc]$/.test(cr);

        // Build canonical filename: ProjectName_City State.webp
        finalFilename = `${projectName}_${cityState}.webp`;

        const portfolioSubdir = isCommercial ? 'commercial' : 'residential';
        destinations = [
            path.join(__dirname, 'src', 'assets', 'portfolio', portfolioSubdir),
            path.join(__dirname, 'src', 'assets', 'projects'),
        ];

        console.log(`\n  ✔  Filename : ${finalFilename}`);
        console.log(`  ✔  Type     : ${isCommercial ? 'Commercial' : 'Residential'}`);
        console.log(`  ✔  Saving to:`);
        console.log(`       src/assets/portfolio/${portfolioSubdir}/`);
        console.log(`       src/assets/projects/\n`);

    } else {
        // ── Non-project image flow ──
        const dirMap = {
            '2': { label: 'Team / People',     dir: path.join(__dirname, 'src', 'assets', 'team') },
            '3': { label: 'Trades / Services', dir: path.join(__dirname, 'src', 'assets', 'trades') },
            '4': { label: 'About Page',        dir: path.join(__dirname, 'src', 'assets', 'about') },
            '5': { label: 'Partners / Logos',  dir: path.join(__dirname, 'src', 'assets', 'Partners') },
            '6': { label: 'General / Other',   dir: path.join(__dirname, 'src', 'assets', 'images') },
        };

        const dest = dirMap[typeChoice];
        console.log(`\n  ── ${dest.label} ─────────────────────────────\n`);

        const rawName = await ask(
            rl,
            '  Descriptive filename (e.g. crew-photo-kingman): ',
            v => v.length > 0
        );

        // Slugify: lowercase, spaces→hyphens, strip special chars
        const slug = rawName
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-_]/g, '');

        finalFilename = `${slug}.webp`;
        destinations  = [dest.dir];
        console.log(`\n  ✔  Filename : ${finalFilename}`);
        console.log(`  ✔  Saving to: src/assets/${path.basename(dest.dir)}/\n`);
    }

    // ── Read source into buffer (prevents Windows EBUSY on rename) ──
    const srcBuffer = fs.readFileSync(filePath);

    // ── Convert and write to each destination ──
    const savedPaths = [];
    for (const dir of destinations) {
        fs.mkdirSync(dir, { recursive: true });
        const destPath = uniqueDestPath(dir, finalFilename);
        await convertImage(srcBuffer, destPath);
        savedPaths.push(destPath);
    }

    const convertedSize = fs.statSync(savedPaths[0]).size;

    // ── Move original to processed/ ──
    fs.mkdirSync(PROCESSED_DIR, { recursive: true });
    fs.renameSync(filePath, path.join(PROCESSED_DIR, filename));

    // ── Report ──
    console.log(`  ✅  Converted successfully!`);
    console.log(`     ${filename}  →  ${finalFilename}`);
    console.log(`     ${formatBytes(originalSize)}  →  ${formatBytes(convertedSize)}  (q85, max 2400px)`);
    savedPaths.forEach(p => console.log(`     📁  ${path.relative(__dirname, p)}`));
    console.log(`     🗂   Original → incoming/processed/${filename}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    fs.mkdirSync(INCOMING_DIR,  { recursive: true });
    fs.mkdirSync(PROCESSED_DIR, { recursive: true });

    const files = fs.readdirSync(INCOMING_DIR).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return SUPPORTED_EXTS.has(ext) && fs.statSync(path.join(INCOMING_DIR, f)).isFile();
    });

    if (files.length === 0) {
        console.log('\n📂  No images found in incoming/');
        console.log('    Drop .jpg/.jpeg/.png/.webp/.heic files into incoming/ and re-run.\n');
        process.exit(0);
    }

    console.log(`\n🚀  import-images — ${files.length} image${files.length > 1 ? 's' : ''} to process`);

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    for (const file of files) {
        await processImage(path.join(INCOMING_DIR, file), rl);
    }

    rl.close();
    console.log(`\n✨  All done.\n`);
}

main().catch(err => {
    console.error('\n❌  Error:', err.message);
    process.exit(1);
});
