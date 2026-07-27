const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(stylesPath, 'utf8');

// Modificar altura de sponsors a 100vh
css = css.replace(
  /\.sponsors \{\n  background: linear-gradient\(to bottom, #000000 40%, rgba\(0, 0, 0, 0\.5\)\), url\('assets\/fondo-sponsors\.jpg'\) bottom \/ cover no-repeat;\n\}\n\n\.sponsors__titulo/g,
  `.sponsors {\n  background: linear-gradient(to bottom, #000000 40%, rgba(0, 0, 0, 0.5)), url('assets/fondo-sponsors.jpg') bottom / cover no-repeat;\n  min-height: 100vh;\n  align-content: center;\n}\n\n.sponsors__titulo`
);

// Fallback just in case min-height was in a different rule block for .sponsors
css = css.replace(
  /\.sponsors \{\n  display: grid;\n  gap: var\(--espacio-md\);\n  padding: var\(--espacio-lg\) var\(--espacio-sm\);\n  min-height: 70vh;\n  align-content: center;\n\}/g,
  `.sponsors {\n  display: grid;\n  gap: var(--espacio-md);\n  padding: var(--espacio-lg) var(--espacio-sm);\n  min-height: 100vh;\n  align-content: center;\n}`
);

fs.writeFileSync(stylesPath, css, 'utf8');
console.log('Sponsors height updated to 100vh');
