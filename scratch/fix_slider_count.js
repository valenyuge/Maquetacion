const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(stylesPath, 'utf8');

// Replace the fixed 396px width with a percentage-based width that guarantees exactly 3 full items and a peek of the 4th (approx 15-20% of it) on any desktop screen size.
// For 3 items + 0.15 of the 4th item, we have 3.15 items. There are 3 gaps between them.
// Width of 1 item = (100% - 3 * gap) / 3.15
css = css.replace(
  /\.encuentros__contenedor \{\n    grid-auto-columns: 396px;\n  \}/,
  `.encuentros__contenedor {\n    /* Calculamos dinámicamente para que SIEMPRE se vean 3 tarjetas enteras y un ~15% de la cuarta, manteniendo la proporción de 396px en pantallas de 1440px */\n    grid-auto-columns: calc((100% - (var(--espacio-sm) * 3)) / 3.15);\n  }`
);

fs.writeFileSync(stylesPath, css, 'utf8');
console.log('Fixed slider visible items count');
