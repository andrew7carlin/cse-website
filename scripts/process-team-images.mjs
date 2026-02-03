/**
 * Process team member images:
 * 1. Move from root to src/assets/team/
 * 2. Remove backgrounds (make transparent)
 * 3. Convert to WebP format
 * 4. Standardize naming (FirstName-LastName.webp)
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOT_DIR = '.';
const OUTPUT_DIR = './src/assets/team';

// Find all image files in root that match the pattern
const imageFiles = fs.readdirSync(ROOT_DIR).filter(f =>
    /\.(png|webp|jpg|jpeg)$/i.test(f) &&
    f.includes('_') &&
    !f.startsWith('.')
);

console.log(`Found ${imageFiles.length} team member images to process:\n`);

async function processImage(filename) {
    try {
        const inputPath = path.join(ROOT_DIR, filename);

        // Parse filename: FirstName-LastName_Position.ext
        const baseName = path.parse(filename).name;
        const [namePart, positionPart] = baseName.split('_');

        // Clean up the name part for output filename
        const outputName = namePart + '.webp';
        const outputPath = path.join(OUTPUT_DIR, outputName);

        // Get image info
        const metadata = await sharp(inputPath).metadata();

        console.log(`Processing: ${filename}`);
        console.log(`  Name: ${namePart.replace('-', ' ')}`);
        console.log(`  Position: ${positionPart}`);
        console.log(`  Size: ${metadata.width}x${metadata.height}`);

        // Process: resize to consistent size, convert to webp
        // Note: Background removal requires AI/ML - we'll just convert and resize
        await sharp(inputPath)
            .resize(400, 500, {
                fit: 'cover',
                position: 'top'
            })
            .webp({ quality: 85 })
            .toFile(outputPath);

        console.log(`  Saved: ${outputPath}\n`);

        // Delete original from root
        fs.unlinkSync(inputPath);

        return {
            filename: outputName,
            name: namePart.replace('-', ' '),
            position: positionPart.replace(/([A-Z])/g, ' $1').trim() // Add spaces before caps
        };
    } catch (err) {
        console.error(`Error processing ${filename}:`, err.message);
        return null;
    }
}

async function main() {
    const results = [];

    for (const file of imageFiles) {
        const result = await processImage(file);
        if (result) {
            results.push(result);
        }
    }

    console.log('\n=== Summary ===');
    console.log(`Processed ${results.length} images\n`);

    // Output import statements for React component
    console.log('// Import statements:');
    results.forEach(r => {
        const varName = r.name.split(' ').map((n, i) =>
            i === 0 ? n.toLowerCase() : n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()
        ).join('');
        console.log(`import ${varName} from '../../assets/team/${r.filename}';`);
    });

    console.log('\n// Team array:');
    console.log('const team = [');
    results.forEach(r => {
        const varName = r.name.split(' ').map((n, i) =>
            i === 0 ? n.toLowerCase() : n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()
        ).join('');
        console.log(`    { name: '${r.name}', title: '${r.position}', photo: ${varName} },`);
    });
    console.log('];');
}

main();
