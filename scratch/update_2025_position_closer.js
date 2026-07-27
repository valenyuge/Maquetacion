const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Change x="50%" back to x="30%"
html = html.replace(/x="50%"/g, 'x="30%"');

// 2. Change margin-top to a strong negative pixel value to pull it UP closer
html = html.replace(/margin-top: -0.15em;/g, 'margin-top: -150px;');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Moved 2025 to 30% and pulled it closer with -150px margin');
