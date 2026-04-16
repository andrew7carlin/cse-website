#!/usr/bin/env node
/**
 * import-images.js
 * Drop images into incoming/ → converts to .webp → prompts for destination
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

const DESTINATIONS = [
  { label: 'Portfolio / Projects',  dir: 'src/assets/projects' },
  { label: 'Team / People',         dir: 'src/assets/team' },
  { label: 'Trades / Services',     dir: 'src/assets/trades' },
  { label: 'About Page',            dir: 'src/assets/about' },
  { label: 'Partners / Logos',      dir: 'src/assets/Partners' },
  { label: 'General / Other',       dir: 'src/assets/images' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.\-_]/g, '');
}

function prompt(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

// ─── Core: process one image ──────────────────────────────────────────────────

async function processImage(filePath, rl) {
  const filename = path.basename(filePath);
  const ext = path.extname(filename).toLowerCase();

  if (!SUPPORTED_EXTS.has(ext)) return;

  const originalSize = fs.statSync(filePath).size;
  const baseName     = slugify(path.basename(filename, ext));
  const outName      = `${baseName}.webp`;

  console.log(`\n📸  Found: ${filename}  (${formatBytes(originalSize)})`);

  // Show destination menu
  console.log('\n  Where should this image go?\n');
  DESTINATIONS.forEach((d, i) => {
    console.log(`    ${i + 1}. ${d.label.padEnd(24)} → ${d.dir}/`);
  });
  console.log('');

  let choice;
  while (true) {
    const raw = await prompt(rl, `  Enter 1–${DESTINATIONS.length}: `);
    const n   = parseInt(raw.trim(), 10);
    if (n >= 1 && n <= DESTINATIONS.length) { choice = DESTINATIONS[n - 1]; break; }
    console.log(`  ⚠️  Please enter a number between 1 and ${DESTINATIONS.length}.`);
  }

  // Ensure destination exists
  const destDir = path.join(__dirname, choice.dir);
  fs.mkdirSync(destDir, { recursive: true });

  const destPath = path.join(destDir, outName);

  // Read source into buffer first — prevents sharp from locking the file
  // (Windows EBUSY bug when renaming a file sharp has open)
  const sourceBuffer = fs.readFileSync(filePath);

  // Convert with sharp (from buffer, not file path)
  await sharp(sourceBuffer)
    .resize({ width: 2400, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(destPath);

  const convertedSize = fs.statSync(destPath).size;

  // Move original to processed/
  fs.mkdirSync(PROCESSED_DIR, { recursive: true });
  const processedPath = path.join(PROCESSED_DIR, filename);
  fs.renameSync(filePath, processedPath);

  console.log(`\n  ✅  Done!`);
  console.log(`     Original : ${formatBytes(originalSize)}`);
  console.log(`     Converted: ${formatBytes(convertedSize)} (.webp q85, max 2400px)`);
  console.log(`     Saved to : ${path.relative(__dirname, destPath)}`);
  console.log(`     Original → incoming/processed/${filename}\n`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Ensure incoming/ exists
  fs.mkdirSync(INCOMING_DIR,  { recursive: true });
  fs.mkdirSync(PROCESSED_DIR, { recursive: true });

  // Scan for pending images
  const files = fs.readdirSync(INCOMING_DIR).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return SUPPORTED_EXTS.has(ext) && fs.statSync(path.join(INCOMING_DIR, f)).isFile();
  });

  if (files.length === 0) {
    console.log('\n📂  No images found in incoming/');
    console.log('    Drop .jpg/.jpeg/.png/.webp/.heic files into the incoming/ folder and re-run.\n');
    process.exit(0);
  }

  console.log(`\n🚀  import-images — ${files.length} image(s) to process\n`);

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  for (const file of files) {
    await processImage(path.join(INCOMING_DIR, file), rl);
  }

  rl.close();
  console.log('✨  All images processed.\n');
}

main().catch(err => {
  console.error('\n❌  Error:', err.message);
  process.exit(1);
});
