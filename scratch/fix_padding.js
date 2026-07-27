const fs = require('fs');
const path = require('path');

const stylesCssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(stylesCssPath, 'utf8');

css = css.replace(
  /\.container \{\s*width: 100%;\s*max-width: 1200px;\s*margin: 0 auto;\s*padding: 0 var\(--espacio-sm\);\s*\}/,
  `.container {\n  width: 100%;\n  padding: 0 var(--espacio-sm);\n}`
);

css = css.replace(
  /@media \(min-width: 1280px\) \{\s*\.container \{\s*padding: 0 var\(--espacio-lg\);\s*\}\s*\}/,
  `@media (min-width: 1280px) {\n  .container {\n    padding: 0 70px;\n  }\n}`
);

// Also need to check if .tarjeta-noticia__container had left padding manually set
css = css.replace(
  /\.tarjeta-noticia__container \{\s*padding-left: var\(--espacio-lg\);\s*\}/,
  `.tarjeta-noticia__container {\n    /* padding-left manejado por .container */\n  }`
);

// And carrusel flecha right margin
css = css.replace(
  /\.carrusel__flecha \{\s*right: var\(--espacio-lg\);\s*\}/,
  `.carrusel__flecha {\n    right: 70px;\n  }`
);

fs.writeFileSync(stylesCssPath, css, 'utf8');

console.log('Fixed container padding to 70px');
