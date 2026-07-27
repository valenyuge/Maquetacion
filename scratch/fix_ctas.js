const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(stylesPath, 'utf8');

// Revert and fix hero CTA
css = css.replace(
  /\.hero__cta \{\n  background-color: transparent;\n  color: #FFFFFF;\n  padding: var\(--espacio-xs\) var\(--espacio-md\);\n  border: 1px solid;\n  border-image-source: linear-gradient\(90deg, #FFFFFF 0%, #2C71FF 100%\);\n  border-image-slice: 1;\n\}/g,
  `.hero__cta {\n  /* Doble background para permitir border-radius + border gradient */\n  background: \n    linear-gradient(var(--color-acento), var(--color-acento)) padding-box,\n    linear-gradient(90deg, #FFFFFF 0%, #2C71FF 100%) border-box;\n  border: 1px solid transparent;\n  color: #FFFFFF;\n  padding: var(--espacio-xs) var(--espacio-md);\n}`
);

// Revert and fix tarjeta-noticia CTA
css = css.replace(
  /\.tarjeta-noticia__cta \{\n  width: fit-content;\n  background-color: transparent;\n  color: #FFFFFF;\n  padding: var\(--espacio-xs\) var\(--espacio-md\);\n  border: 1px solid;\n  border-image-source: linear-gradient\(90deg, #FFFFFF 0%, #2C71FF 100%\);\n  border-image-slice: 1;\n\}/g,
  `.tarjeta-noticia__cta {\n  width: fit-content;\n  /* Doble background para permitir border-radius + border gradient */\n  background: \n    linear-gradient(var(--color-acento), var(--color-acento)) padding-box,\n    linear-gradient(90deg, #FFFFFF 0%, #2C71FF 100%) border-box;\n  border: 1px solid transparent;\n  color: #FFFFFF;\n  padding: var(--espacio-xs) var(--espacio-md);\n}`
);

fs.writeFileSync(stylesPath, css, 'utf8');
console.log('Fixed CTAs border radius and gradients');
