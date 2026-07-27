const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(stylesPath, 'utf8');

// Mobile view of encuentros__contenedor
css = css.replace(
  /\.encuentros__contenedor \{\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: var\(--espacio-sm\);\n\}/,
  `.encuentros__contenedor {\n  display: grid;\n  grid-auto-flow: column;\n  grid-auto-columns: 85%;\n  gap: var(--espacio-sm);\n  overflow-x: auto;\n  scroll-snap-type: x mandatory;\n  padding-bottom: var(--espacio-xs);\n  /* Ocultar scrollbar visualmente pero permitir scroll */\n  scrollbar-width: none;\n}\n.encuentros__contenedor::-webkit-scrollbar {\n  display: none;\n}`
);

// Desktop view of encuentros__contenedor
css = css.replace(
  /\.encuentros__contenedor \{\n    grid-template-columns: repeat\(3, 1fr\);\n  \}/,
  `.encuentros__contenedor {\n    grid-auto-columns: calc((100% - (var(--espacio-sm) * 2)) / 3);\n  }`
);

// Add scroll-snap-align to tarjeta-evento
css = css.replace(
  /\.tarjeta-evento \{\n  position: relative;\n  min-height: 380px;\n\}/,
  `.tarjeta-evento {\n  position: relative;\n  min-height: 380px;\n  scroll-snap-align: start;\n}`
);

fs.writeFileSync(stylesPath, css, 'utf8');

console.log('Fixed encuentros carrusel');
