const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// The issue: .encuentros has 'gap', but its children are inside .container, so gap does nothing!
// We need to add margin-bottom to .encuentros__encabezado

const overrides = `
/* Fix gap between Encuentros header and cards */
.encuentros__encabezado {
  margin-bottom: var(--espacio-md) !important;
}
`;

css += overrides;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Added margin-bottom to encuentros__encabezado');
