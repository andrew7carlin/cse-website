import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files to update
const filesToUpdate = [
    'src/pages/TradeDetail.jsx',
    'src/pages/Services.jsx',
    'src/pages/Partnerships.jsx',
    'src/pages/About.jsx',
    'src/components/projects/ProjectCard.jsx',
    'src/components/ui/LeadershipSection.jsx',
    'src/components/ui/Accordion.jsx',
    'src/components/ui/SocialSection.jsx',
    'src/components/ui/PartnersSection.jsx',
    'src/utils/assetLoader.js',
];

// Extensions to replace
const extensionMap = {
    '.jpg': '.webp',
    '.jpeg': '.webp',
    '.png': '.webp',
    '.JPG': '.webp',
    '.JPEG': '.webp',
    '.PNG': '.webp',
};

let updatedCount = 0;

function updateImports(filePath) {
    const fullPath = path.join(__dirname, '..', filePath);

    if (!fs.existsSync(fullPath)) {
        console.log(`Skipping ${filePath} (not found)`);
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;

    for (const [oldExt, newExt] of Object.entries(extensionMap)) {
        const regex = new RegExp(`(from\\s+['"][^'"]*\\${oldExt})(['"])`, 'g');
        const newContent = content.replace(regex, (match, p1, p2) => {
            modified = true;
            return p1.replace(oldExt, newExt) + p2;
        });
        content = newContent;

        // Also handle require() statements
        const requireRegex = new RegExp(`(require\\(['"][^'"]*\\${oldExt})(['"]\\))`, 'g');
        content = content.replace(requireRegex, (match, p1, p2) => {
            modified = true;
            return p1.replace(oldExt, newExt) + p2;
        });
    }

    if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`✓ Updated: ${filePath}`);
        updatedCount++;
    } else {
        console.log(`  No changes: ${filePath}`);
    }
}

console.log('🔄 Updating import statements to .webp\n');

for (const file of filesToUpdate) {
    updateImports(file);
}

console.log(`\n✅ Updated ${updatedCount} files`);
