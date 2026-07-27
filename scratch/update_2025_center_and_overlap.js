const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Center 2025 by changing x="..." back to x="50%"
html = html.replace(/x="30%"/g, 'x="50%"');
html = html.replace(/x="38%"/g, 'x="50%"');
html = html.replace(/x="47\.5%"/g, 'x="50%"');

// 2. Restore the margin to exactly -0.15em as requested
html = html.replace(/margin-top:\s*-[0-9]+px;/g, 'margin-top: -0.15em;');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Centered 2025 and restored -0.15em overlap');
