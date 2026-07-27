const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Update inline margin-top from -45px to -120px (more negative pulls it UP closer to the text above)
html = html.replace(
  /margin-top:\s*-45px;/g,
  `margin-top: -120px;`
);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('2025 margin increased negatively to pull it up');
