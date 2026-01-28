import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PARTNERSHIPS_FILE = path.join(__dirname, '../src/pages/Partnerships.jsx');
const PARTNERS_SECTION_FILE = path.join(__dirname, '../src/components/ui/PartnersSection.jsx');

// Read the files
let partnershipsContent = fs.readFileSync(PARTNERSHIPS_FILE, 'utf8');
let partnersSectionContent = fs.readFileSync(PARTNERS_SECTION_FILE, 'utf8');

// Replace all image extensions with .webp in imports
const extensionsToReplace = ['.jpg', '.jpeg', '.png', '.avif'];

extensionsToReplace.forEach(ext => {
    const regex = new RegExp(`from\\s+['"]([^'"]+)${ext.replace('.', '\\.')}['"]`, 'g');
    partnershipsContent = partnershipsContent.replace(regex, `from '$1.webp'`);
    partnersSectionContent = partnersSectionContent.replace(regex, `from '$1.webp'`);
});

// Write the updated files
fs.writeFileSync(PARTNERSHIPS_FILE, partnershipsContent);
fs.writeFileSync(PARTNERS_SECTION_FILE, partnersSectionContent);

console.log('✓ Updated Partnerships.jsx');
console.log('✓ Updated PartnersSection.jsx');
console.log('\nAll imports now use .webp extensions');
