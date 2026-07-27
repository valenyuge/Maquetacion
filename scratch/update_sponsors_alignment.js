const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(stylesPath, 'utf8');

// Cambiar align-content de center a start para poner el contenido arriba
css = css.replace(
  /\.sponsors \{\n  display: grid;\n  gap: var\(--espacio-md\);\n  padding: var\(--espacio-lg\) var\(--espacio-sm\);\n  min-height: 100vh;\n  align-content: center;\n\}/g,
  `.sponsors {\n  display: grid;\n  gap: var(--espacio-md);\n  padding: var(--espacio-lg) var(--espacio-sm);\n  min-height: 100vh;\n  align-content: start;\n}`
);

fs.writeFileSync(stylesPath, css, 'utf8');
console.log('Sponsors alignment updated to start');
