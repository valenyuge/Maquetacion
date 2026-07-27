const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
const htmlPath = path.join(__dirname, '../index.html');

let css = fs.readFileSync(stylesPath, 'utf8');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Change CSS variable for base font
css = css.replace(
  /--font-base:\s*'Beiruti',\s*sans-serif;/g,
  `--font-base: 'Exo', sans-serif;`
);

// 2. Remove uppercase from .hero__categoria
css = css.replace(
  /(\.hero__categoria\s*\{[\s\S]*?)text-transform:\s*uppercase;\s*([\s\S]*?\})/g,
  '$1$2'
);

// 3. Update HTML text to ensure correct casing (Pasión, barrio y fútbol)
// We look for any capitalization of that phrase and replace it
html = html.replace(
  />\s*[Pp]asi[óo]n,\s*barrio\s*y\s*f[úu]tbol\s*</ig,
  `>Pasión, barrio y fútbol<`
);

// Clean up any stray font-family: Exo from the footer since it's global now
css = css.replace(
  /font-family:\s*'Exo',\s*sans-serif;\s*/g,
  ''
);

fs.writeFileSync(stylesPath, css, 'utf8');
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Font updated to Exo globally and casing fixed for hero string.');
