/**
 * Remove backgrounds from team member photos using AI
 * Uses @imgly/background-removal-node for intelligent background removal
 */

import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import path from 'path';

const TEAM_DIR = './src/assets/team';

async function processImage(filename) {
    const inputPath = path.join(TEAM_DIR, filename);
    // Output as PNG since it supports transparency
    const outputPath = path.join(TEAM_DIR, filename.replace('.webp', '.png'));

    console.log(`Processing: ${filename}`);

    try {
        // Read the image file
        const imageBuffer = fs.readFileSync(inputPath);

        // Create a blob from the buffer
        const blob = new Blob([imageBuffer], { type: 'image/webp' });

        // Remove background using AI
        console.log('  Removing background...');
        const resultBlob = await removeBackground(blob, {
            output: {
                format: 'image/png'
            }
        });

        // Convert blob back to buffer
        const resultBuffer = Buffer.from(await resultBlob.arrayBuffer());

        // Write the result
        fs.writeFileSync(outputPath, resultBuffer);
        console.log(`  Saved: ${outputPath}`);

        // Remove original webp
        fs.unlinkSync(inputPath);
        console.log(`  Removed original: ${filename}\n`);

        return true;
    } catch (err) {
        console.error(`  Error: ${err.message}\n`);
        return false;
    }
}

async function main() {
    console.log('=== AI Background Removal for Team Photos ===\n');
    console.log('Note: First run downloads ~200MB AI model\n');

    const files = fs.readdirSync(TEAM_DIR)
        .filter(f => f.endsWith('.webp'));

    console.log(`Found ${files.length} images to process\n`);

    let success = 0;
    let failed = 0;

    for (const file of files) {
        const result = await processImage(file);
        if (result) success++;
        else failed++;
    }

    console.log('=== Complete ===');
    console.log(`Success: ${success}`);
    console.log(`Failed: ${failed}`);
}

main();
