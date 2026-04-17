/**
 * Remove backgrounds from all partner/supplier logos in src/assets/Partners/
 * Skips SVGs (already vector/transparent). Overwrites files in-place.
 * Uses @imgly/background-removal-node (already installed).
 *
 * Run: node scripts/remove-partner-backgrounds.mjs
 */

import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import path from 'path';

const PARTNERS_DIR = './src/assets/Partners';

// Skip SVGs (vector, already transparent) and the old corrupt srs.webp (1KB)
const SKIP = new Set(['abc-supply.svg', 'gulf-eagle.svg', 'abc-supply.webp', 'gulf-eagle.webp', 'srs.webp', 'Certianteed.webp']);

async function processFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  const inputPath = path.join(PARTNERS_DIR, filename);
  const stat = fs.statSync(inputPath);

  // Skip tiny/corrupt files (<2 KB for webp likely corrupt)
  if (ext === '.webp' && stat.size < 2000) {
    console.log(`  SKIP (too small, likely corrupt): ${filename}`);
    return 'skipped';
  }

  const mimeType = ext === '.png' ? 'image/png' : 'image/webp';
  const outputFormat = ext === '.png' ? 'image/png' : 'image/webp';

  console.log(`Processing: ${filename} (${Math.round(stat.size / 1024)}KB)`);

  try {
    const imageBuffer = fs.readFileSync(inputPath);
    const blob = new Blob([imageBuffer], { type: mimeType });

    const resultBlob = await removeBackground(blob, {
      output: { format: outputFormat },
    });

    const resultBuffer = Buffer.from(await resultBlob.arrayBuffer());
    fs.writeFileSync(inputPath, resultBuffer);
    console.log(`  ✓ Saved (${Math.round(resultBuffer.length / 1024)}KB)\n`);
    return 'success';
  } catch (err) {
    console.error(`  ✗ Error: ${err.message}\n`);
    return 'failed';
  }
}

async function main() {
  console.log('=== Background Removal — Partner Logos ===\n');
  console.log('Note: First run downloads ~200MB AI model\n');

  const files = fs.readdirSync(PARTNERS_DIR)
    .filter(f => {
      const ext = path.extname(f).toLowerCase();
      return ['.webp', '.png', '.jpg', '.jpeg'].includes(ext) && !SKIP.has(f);
    })
    .sort();

  console.log(`Found ${files.length} files to process:\n${files.join('\n')}\n`);

  const counts = { success: 0, skipped: 0, failed: 0 };

  for (const file of files) {
    const result = await processFile(file);
    counts[result]++;
  }

  console.log('\n=== Complete ===');
  console.log(`✓ Success:  ${counts.success}`);
  console.log(`— Skipped:  ${counts.skipped}`);
  console.log(`✗ Failed:   ${counts.failed}`);
}

main();
