#!/usr/bin/env node
/**
 * import-images.js  —  Canyon State image import tool
 *
 * Drop images into incoming/ → prompts for metadata → converts to .webp
 * Project images: ProjectName_City State.webp
 * Other images:   descriptive-name.webp
 *
 * If a project photo belongs to an existing project, it auto-patches
 * src/data/projects.js — adding the import and appending to the gallery array.
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
const PROJECTS_JS    = path.join(__dirname, 'src', 'data', 'projects.js');
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
    const ext  = path.extname(filename);
    const base = path.basename(filename, ext);
    let   candidate = path.join(dir, filename);
    let   counter   = 2;
    while (fs.existsSync(candidate)) {
        candidate = path.join(dir, `${base}_${counter}${ext}`);
        counter++;
    }
    return candidate;
}

// Convert a filename to a valid JS camelCase identifier
// "Aloft Hotel_Ashville NC_2.webp" → "aloftHotelAshvilleNc2"
function toVarName(filename) {
    return path.basename(filename, path.extname(filename))
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
        .replace(/[^a-zA-Z0-9]/g, '')
        .replace(/^[A-Z]/, c => c.toLowerCase());
}

// ─── projects.js patcher ──────────────────────────────────────────────────────

function getProjectIds() {
    const src = fs.readFileSync(PROJECTS_JS, 'utf8');
    const ids = [];
    const re  = /\{\s*id:\s*'([^']+)'/g;
    let m;
    while ((m = re.exec(src)) !== null) ids.push(m[1]);
    return ids;
}

function getProjectName(id) {
    const src = fs.readFileSync(PROJECTS_JS, 'utf8');
    const re  = new RegExp(`id:\\s*'${id}',\\s*name:\\s*'([^']+)'`);
    const m   = src.match(re);
    return m ? m[1] : id;
}

/**
 * Injects an import line right before the first non-import/comment line
 * that follows the existing block of import statements.
 */
function addImportLine(src, varName, importPath) {
    const importLine = `import ${varName} from '${importPath}';\n`;
    // Find the last import line index
    const lines = src.split('\n');
    let lastImportIdx = -1;
    for (let i = 0; i < lines.length; i++) {
        if (/^import\s/.test(lines[i])) lastImportIdx = i;
    }
    if (lastImportIdx === -1) {
        // No imports yet — prepend
        return importLine + src;
    }
    lines.splice(lastImportIdx + 1, 0, importLine.trimEnd());
    return lines.join('\n');
}

/**
 * Adds varName to the gallery of the project with the given id.
 *
 * Handles two cases:
 *   A) Project already has  gallery: [...]  → append before closing ]
 *   B) Project has no gallery               → add  gallery: [varName]  field
 *
 * Returns updated source or throws if project not found.
 */
function addToProjectGallery(src, projectId, varName) {
    // Find the start of the project object
    const startRe = new RegExp(`\\{\\s*id:\\s*'${projectId}'`);
    const startMatch = startRe.exec(src);
    if (!startMatch) throw new Error(`Project id '${projectId}' not found in projects.js`);

    const objStart = startMatch.index;

    // Walk forward to find the matching closing }, accounting for nesting
    let depth = 0;
    let objEnd = -1;
    for (let i = objStart; i < src.length; i++) {
        if (src[i] === '{') depth++;
        else if (src[i] === '}') {
            depth--;
            if (depth === 0) { objEnd = i; break; }
        }
    }
    if (objEnd === -1) throw new Error(`Could not find closing } for project '${projectId}'`);

    const objSrc = src.slice(objStart, objEnd + 1);

    // Case A: existing gallery
    const galleryRe = /gallery:\s*\[/;
    if (galleryRe.test(objSrc)) {
        // Find the gallery array close ] within the object
        const galleryStart = objStart + objSrc.search(galleryRe);
        const bracketOpen  = src.indexOf('[', galleryStart);
        // Walk to matching ]
        let bracketDepth = 0;
        let bracketClose = -1;
        for (let i = bracketOpen; i < objEnd; i++) {
            if (src[i] === '[') bracketDepth++;
            else if (src[i] === ']') {
                bracketDepth--;
                if (bracketDepth === 0) { bracketClose = i; break; }
            }
        }
        if (bracketClose === -1) throw new Error(`Could not find gallery ] for project '${projectId}'`);

        // Insert ", varName" before the closing ]
        return src.slice(0, bracketClose) + `, ${varName}` + src.slice(bracketClose);
    }

    // Case B: no gallery — add it. Insert before the closing }
    // Find the last non-whitespace char before objEnd to place the comma correctly
    const beforeClose = src.slice(objStart, objEnd).trimEnd();
    const insertPos   = objStart + beforeClose.length;
    return src.slice(0, insertPos) + `, gallery: [${varName}]` + src.slice(insertPos);
}

/**
 * Full projects.js patch: add import line + gallery entry.
 * importRelPath: path relative to src/data/ e.g. '../assets/portfolio/commercial/Foo.webp'
 */
function patchProjectsJs(projectId, varName, importRelPath) {
    let src = fs.readFileSync(PROJECTS_JS, 'utf8');

    // Skip if already imported (idempotent)
    if (src.includes(`import ${varName} from`)) {
        console.log(`  ℹ️   Import for '${varName}' already exists — skipping import line.`);
    } else {
        src = addImportLine(src, varName, importRelPath);
    }

    src = addToProjectGallery(src, projectId, varName);
    fs.writeFileSync(PROJECTS_JS, src, 'utf8');
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
    let portfolioSubdir = '';

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
        portfolioSubdir    = isCommercial ? 'commercial' : 'residential';

        // Build canonical filename: ProjectName_City State.webp
        finalFilename = `${projectName}_${cityState}.webp`;

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

        const slug = rawName
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-_]/g, '');

        finalFilename = `${slug}.webp`;
        destinations  = [dest.dir];
        console.log(`\n  ✔  Filename : ${finalFilename}`);
        console.log(`  ✔  Saving to: src/assets/${path.basename(dest.dir)}/\n`);
    }

    // ── Read source into buffer ──
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
    console.log(`     ${filename}  →  ${path.basename(savedPaths[0])}`);
    console.log(`     ${formatBytes(originalSize)}  →  ${formatBytes(convertedSize)}  (q85, max 2400px)`);
    savedPaths.forEach(p => console.log(`     📁  ${path.relative(__dirname, p)}`));
    console.log(`     🗂   Original → incoming/processed/${filename}`);

    // ── Existing project gallery patch ──────────────────────────────────────
    if (isProject) {
        const addToExisting = await ask(
            rl,
            '\n  Add to an existing project\'s gallery in projects.js? (Y/N): ',
            v => /^[YyNn]$/.test(v)
        );

        if (/^[Yy]$/.test(addToExisting)) {
            // Show all project IDs and names
            const ids = getProjectIds();
            console.log('\n  ── Existing projects ─────────────────────────────────\n');
            ids.forEach((id, i) => {
                const name = getProjectName(id);
                console.log(`    ${String(i + 1).padStart(3)}. ${id}  (${name})`);
            });

            const pick = await ask(
                rl,
                `\n  Enter number (1–${ids.length}) or type the project ID: `,
                v => {
                    const n = parseInt(v);
                    if (!isNaN(n) && n >= 1 && n <= ids.length) return true;
                    if (ids.includes(v)) return true;
                    return false;
                }
            );

            const chosenId = isNaN(parseInt(pick)) ? pick : ids[parseInt(pick) - 1];

            // Build import path relative to src/data/
            const actualFile = path.basename(savedPaths[0]);  // the file saved in portfolio/
            const importRelPath = `../assets/portfolio/${portfolioSubdir}/${actualFile}`;
            const varName = toVarName(actualFile);

            try {
                patchProjectsJs(chosenId, varName, importRelPath);
                console.log(`\n  ✅  projects.js updated!`);
                console.log(`       import ${varName} from '${importRelPath}'`);
                console.log(`       Added to gallery of '${chosenId}' (${getProjectName(chosenId)})\n`);
            } catch (err) {
                console.log(`\n  ⚠️   Could not auto-patch projects.js: ${err.message}`);
                console.log(`       Add manually:`);
                console.log(`         import ${varName} from '${importRelPath}';`);
                console.log(`         Push ${varName} into the '${chosenId}' gallery array.\n`);
            }
        }
    }
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
