const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(stylesPath, 'utf8');

// Use a robust regex to replace the entire .sponsors block to guarantee we fix the alignment and height.
// First, find the first occurrence of .sponsors block (the one that sets the background)
const sponsorsBlockRegex1 = /\.sponsors\s*\{\s*background:\s*linear-gradient\([\s\S]*?;\s*min-height:\s*\d+vh;\s*align-content:\s*\w+;\s*\}/;

if (sponsorsBlockRegex1.test(css)) {
  css = css.replace(sponsorsBlockRegex1, `.sponsors {\n  background: linear-gradient(to bottom, #000000 40%, rgba(0, 0, 0, 0.5)), url('assets/fondo-sponsors.jpg') bottom / cover no-repeat;\n  min-height: 100vh;\n  align-content: start;\n}`);
} else {
  // If we don't find it with min-height, just replace the background one
  css = css.replace(/\.sponsors\s*\{\s*background:\s*linear-gradient\([\s\S]*?\n\}/, `.sponsors {\n  background: linear-gradient(to bottom, #000000 40%, rgba(0, 0, 0, 0.5)), url('assets/fondo-sponsors.jpg') bottom / cover no-repeat;\n  min-height: 100vh;\n  align-content: start;\n}`);
}

// Find the second occurrence of .sponsors (the one with display: grid)
const sponsorsBlockRegex2 = /\.sponsors\s*\{\s*display:\s*grid;\s*gap:\s*var\(--espacio-md\);\s*padding:\s*var\(--espacio-lg\)\s*var\(--espacio-sm\);\s*(?:min-height:\s*\d+vh;\s*align-content:\s*\w+;\s*)?\}/;

if (sponsorsBlockRegex2.test(css)) {
  css = css.replace(sponsorsBlockRegex2, `.sponsors {\n  display: grid;\n  gap: var(--espacio-md);\n  padding: var(--espacio-lg) var(--espacio-sm);\n  align-content: start;\n}`);
}

// Ensure the logo size is updated to 200px
css = css.replace(
  /\.sponsors__logo\s*\{\s*max-width:\s*120px;/,
  `.sponsors__logo {\n  max-width: 200px;`
);

fs.writeFileSync(stylesPath, css, 'utf8');
console.log('Fixed alignment and logo size');
