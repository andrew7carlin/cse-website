import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
    quality: 82,
    maxWidth: 1920,
    maxHeight: 1080,
    formats: ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'],
};

// Directories to process
const ASSET_DIRS = [
    path.join(__dirname, '../src/assets/projects'),
    path.join(__dirname, '../src/assets/leadership'),
    path.join(__dirname, '../src/assets/Partners'),
];

let totalOriginalSize = 0;
let totalCompressedSize = 0;
let processedCount = 0;

async function compressImage(inputPath) {
    const ext = path.extname(inputPath);
    if (!CONFIG.formats.includes(ext)) return null;

    const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

    try {
        const originalStats = fs.statSync(inputPath);
        totalOriginalSize += originalStats.size;

        // Read and compress image
        let pipeline = sharp(inputPath);

        // Get metadata to check dimensions
        const metadata = await pipeline.metadata();

        // Resize if larger than max dimensions
        if (metadata.width > CONFIG.maxWidth || metadata.height > CONFIG.maxHeight) {
            pipeline = pipeline.resize(CONFIG.maxWidth, CONFIG.maxHeight, {
                fit: 'inside',
                withoutEnlargement: true,
            });
        }

        // Convert to WebP
        await pipeline
            .webp({ quality: CONFIG.quality })
            .toFile(outputPath);

        const compressedStats = fs.statSync(outputPath);
        totalCompressedSize += compressedStats.size;

        const savings = ((1 - compressedStats.size / originalStats.size) * 100).toFixed(1);
        console.log(`✓ ${path.basename(inputPath)} → ${path.basename(outputPath)} (${savings}% smaller)`);

        // Delete original file
        fs.unlinkSync(inputPath);

        processedCount++;
        return { original: inputPath, compressed: outputPath };
    } catch (err) {
        console.error(`✗ Error processing ${inputPath}:`, err.message);
        return null;
    }
}

async function processDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        console.log(`Skipping ${dirPath} (not found)`);
        return;
    }

    console.log(`\nProcessing: ${dirPath}`);
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            await processDirectory(filePath);
        } else {
            await compressImage(filePath);
        }
    }
}

async function main() {
    console.log('🖼️  Image Compression Script');
    console.log('============================\n');
    console.log(`Quality: ${CONFIG.quality}%`);
    console.log(`Max dimensions: ${CONFIG.maxWidth}x${CONFIG.maxHeight}`);
    console.log('');

    const startTime = Date.now();

    for (const dir of ASSET_DIRS) {
        await processDirectory(dir);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    const originalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
    const compressedMB = (totalCompressedSize / 1024 / 1024).toFixed(2);
    const savingsMB = (totalOriginalSize - totalCompressedSize) / 1024 / 1024;
    const savingsPercent = ((1 - totalCompressedSize / totalOriginalSize) * 100).toFixed(1);

    console.log('\n============================');
    console.log('📊 Compression Summary');
    console.log('============================');
    console.log(`Files processed: ${processedCount}`);
    console.log(`Original size:   ${originalMB} MB`);
    console.log(`Compressed size: ${compressedMB} MB`);
    console.log(`Savings:         ${savingsMB.toFixed(2)} MB (${savingsPercent}%)`);
    console.log(`Duration:        ${duration}s`);
    console.log('\n⚠️  Remember to update import statements to use .webp files!');
}

main().catch(console.error);
