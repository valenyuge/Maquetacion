const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
const cssPath = path.join(__dirname, '../styles.css');

let html = fs.readFileSync(htmlPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Shrink 2025 in HTML to 176px
html = html.replace(
  /font-size: 224px;/g,
  `font-size: 176px;`
);

// 2. Move it more to the left (x="30%")
html = html.replace(
  /x="38%"/g,
  `x="30%"`
);

// 3. Adjust overlap to pull it UP more so it covers CAMPEONES like before
html = html.replace(
  /margin-top: -120px;/g,
  `margin-top: -145px;`
);

// Shrink 2025 in CSS if it's there
css = css.replace(
  /font-size: 224px;/g,
  `font-size: 176px;`
);

fs.writeFileSync(htmlPath, html, 'utf8');
fs.writeFileSync(cssPath, css, 'utf8');
console.log('2025 fine tuned (smaller, more left, overlap adjusted)');
