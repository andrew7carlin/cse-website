import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PARTNERS_DIR = path.join(__dirname, '../src/assets/Partners');
const BACKUP_DIR = path.join(__dirname, '../src/assets/Partners_backup');

// Create backup directory if it doesn't exist
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    console.log('✓ Created backup directory');
}

// Get all image files
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
const files = fs.readdirSync(PARTNERS_DIR).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
});

console.log(`Found ${files.length} logo files to optimize\n`);

// Process each file
let processed = 0;
let errors = 0;

for (const file of files) {
    const inputPath = path.join(PARTNERS_DIR, file);
    const backupPath = path.join(BACKUP_DIR, file);
    const baseName = path.basename(file, path.extname(file));
    const outputPath = path.join(PARTNERS_DIR, `${baseName}.webp`);

    try {
        // Backup original
        if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(inputPath, backupPath);
        }

        // Get original file size
        const originalSize = fs.statSync(inputPath).size;

        // Process image
        await sharp(inputPath)
            .resize(500, 500, {
                fit: 'inside',
                withoutEnlargement: true,
            })
            .webp({
                quality: 85,
                alphaQuality: 100,
            })
            .toFile(outputPath);

        const optimizedSize = fs.statSync(outputPath).size;
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

        console.log(`✓ ${file}`);
        console.log(`  ${(originalSize / 1024).toFixed(1)} KB → ${(optimizedSize / 1024).toFixed(1)} KB (${savings}% reduction)\n`);

        // Delete old file if it's not already .webp
        if (path.extname(file).toLowerCase() !== '.webp' && outputPath !== inputPath) {
            fs.unlinkSync(inputPath);
        }

        processed++;
    } catch (error) {
        console.error(`✗ Error processing ${file}:`, error.message);
        errors++;
    }
}

console.log('\n================================');
console.log(`Optimization complete!`);
console.log(`Successfully processed: ${processed}`);
console.log(`Errors: ${errors}`);
console.log(`Backups saved to: ${BACKUP_DIR}`);
console.log('================================');
