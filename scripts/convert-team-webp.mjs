import sharp from 'sharp';
import { readdir, unlink } from 'fs/promises';
import { join, basename } from 'path';

const teamDir = 'src/assets/team';
const files = await readdir(teamDir);
const pngs = files.filter(f => f.endsWith('.png'));

console.log(`Found ${pngs.length} PNG files to convert...`);

for (const file of pngs) {
  const input = join(teamDir, file);
  const output = join(teamDir, basename(file, '.png') + '.webp');
  await sharp(input).webp({ quality: 80 }).toFile(output);
  await unlink(input);
  console.log(`✓ ${file} → ${basename(output)}`);
}
console.log('Done.');
