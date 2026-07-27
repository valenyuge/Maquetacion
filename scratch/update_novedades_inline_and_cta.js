const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
const cssPath = path.join(__dirname, '../styles.css');

let html = fs.readFileSync(htmlPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Fix inline styles for tarjeta-noticia gradient
html = html.replace(
  /linear-gradient\(to top right, rgba\(0, 0, 0, 0\.9\) 0%, rgba\(0, 0, 0, 0\.2\) 60%\)/g,
  `linear-gradient(to bottom, transparent 0%, transparent 60%, #000000 100%)`
);

fs.writeFileSync(htmlPath, html, 'utf8');

// 2. Explicitly force Exo on .boton
css = css.replace(
  /\.boton\s*\{\s*display:\s*inline-block;\s*width:\s*fit-content;\s*padding:\s*var\(--espacio-xs\)\s*var\(--espacio-sm\);\s*font-family:\s*var\(--font-base\);\s*\}/g,
  `.boton {\n  display: inline-block;\n  width: fit-content;\n  padding: var(--espacio-xs) var(--espacio-sm);\n  font-family: 'Exo', sans-serif;\n}`
);

// Fallback if formatting doesn't perfectly match
if (!css.includes("font-family: 'Exo', sans-serif;") || css.includes("font-family: var(--font-base);")) {
   css = css.replace(/font-family:\s*var\(--font-base\);/g, "font-family: 'Exo', sans-serif;");
}

fs.writeFileSync(cssPath, css, 'utf8');

console.log('Fixed inline gradient and CTA font.');
