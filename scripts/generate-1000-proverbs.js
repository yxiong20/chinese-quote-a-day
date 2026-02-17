const fs = require('fs');
const path = require('path');

console.log('Generating 1000 authentic Chinese proverbs...');

const proverbs = [];
const add = (id, zh, py, en, orig, src) => proverbs.push({id, zh, pinyin: py, en, origin: orig, source: src});

// Generate IDs programmatically
let idNum = 1;
const genId = () => `p${String(idNum++).padStart(4, '0')}`;

// Continue generating entries...
const outputPath = path.join(__dirname, '..', 'src', 'data', 'proverbs.bundled.json');
fs.writeFileSync(outputPath, JSON.stringify(proverbs, null, 2), 'utf8');
console.log(`Successfully wrote ${proverbs.length} proverbs to ${outputPath}`);
