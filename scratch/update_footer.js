const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
const htmlPath = path.join(__dirname, '../index.html');

let css = fs.readFileSync(stylesPath, 'utf8');
let html = fs.readFileSync(htmlPath, 'utf8');

// Update footer color and font
css = css.replace(
  /\.footer\s*\{\s*background-color:\s*#[0-9A-Fa-f]+;[\s\S]*?\}/,
  `.footer {\n  background-color: #022102;\n  color: var(--color-claro);\n  font-family: 'Exo', sans-serif;\n}`
);

// Add Exo to Google Fonts in index.html
if (!html.includes('family=Exo')) {
  // It's safer to just inject it before the closing </head> to avoid regex misses on the exact google fonts string
  html = html.replace(
    /<\/head>/,
    `  <link href="https://fonts.googleapis.com/css2?family=Exo:wght@400;600;700&display=swap" rel="stylesheet">\n</head>`
  );
}

fs.writeFileSync(stylesPath, css, 'utf8');
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Fixed footer color, added Exo font');
