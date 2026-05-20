/**
 * Generates responsive WebP variants of hero images so React components can
 * ship srcSet with 640w / 960w / 1200w sources. The intrinsic file (e.g.
 * `Hyundai Gilbert_Gilbert Az.webp`) stays untouched as the largest variant;
 * we emit `-640w.webp` and `-960w.webp` next to it.
 *
 * Run with: `node scripts/generate-hero-variants.mjs`
 *
 * Add new hero sources to the SOURCES list below as you create them.
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Widths to emit. The original file is kept as the upper-bound variant — no
// suffix added — so existing imports keep working as the `src` fallback.
const WIDTHS = [640, 960];
const QUALITY = 80;

// Hero source files (paths relative to project root). Add new heroes here.
const SOURCES = [
  'src/assets/projects/Hyundai Gilbert_Gilbert Az.webp',
];

async function generateVariants(relPath) {
  const absInput = path.join(projectRoot, relPath);
  if (!fs.existsSync(absInput)) {
    console.warn(`✗ missing: ${relPath}`);
    return;
  }

  const ext  = path.extname(absInput);                          // .webp
  const base = absInput.slice(0, -ext.length);                  // …/Hyundai Gilbert_Gilbert Az
  const meta = await sharp(absInput).metadata();
  console.log(`\n→ ${relPath}  (${meta.width}×${meta.height})`);

  for (const w of WIDTHS) {
    if (meta.width <= w) {
      console.log(`  – skip ${w}w (source narrower)`);
      continue;
    }
    const outPath = `${base}-${w}w.webp`;
    await sharp(absInput)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath);
    const kb = (fs.statSync(outPath).size / 1024).toFixed(1);
    console.log(`  ✓ ${path.basename(outPath)}  (${kb} kB)`);
  }
}

for (const src of SOURCES) {
  await generateVariants(src);
}

console.log('\nDone. Update your <img> srcSet to reference the new variants.');
