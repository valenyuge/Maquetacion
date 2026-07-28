const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Equalize margin between Encuentros and Novedades (gap: var(--espacio-sm) -> var(--espacio-md))
css = css.replace(
  /\.encuentros \{\n  display: grid;\n  gap: var\(--espacio-sm\);\n\}/g,
  `.encuentros {\n  display: grid;\n  gap: var(--espacio-md);\n}`
);

// 2. Vertically center the Novedades arrow on desktop instead of sticking it to the bottom
css = css.replace(
  /@media \(min-width: 1280px\) \{\n  \.carrusel__flecha \{\n    right: 70px;\n    display: flex;\n  \}\n\}/g,
  `@media (min-width: 1280px) {\n  .carrusel__flecha {\n    right: 70px;\n    display: flex;\n    bottom: auto;\n    top: 50%;\n    transform: translateY(-50%);\n  }\n}`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Fixed margin and centered arrow on desktop');
