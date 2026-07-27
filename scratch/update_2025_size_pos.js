const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
const cssPath = path.join(__dirname, '../styles.css');

let html = fs.readFileSync(htmlPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Shrink 2025 in HTML
html = html.replace(
  /font-size: 280px;/g,
  `font-size: 224px;`
);

// 2. Move it significantly more to the left
html = html.replace(
  /x="47\.5%"/g,
  `x="38%"`
);

// 3. Shrink 2025 in CSS (media queries etc)
css = css.replace(
  /font-size: 280px;/g,
  `font-size: 224px;`
);

fs.writeFileSync(htmlPath, html, 'utf8');
fs.writeFileSync(cssPath, css, 'utf8');
console.log('2025 size reduced and shifted left');
