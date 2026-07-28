const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// The broken code injected was:
// .novedades__carrusel { ... }
// .novedades__carrusel::-webkit-scrollbar { ... }
// .tarjeta-noticia {
//   scroll-snap-align: start;

// I will replace that whole chunk with the original code.
// Let's use a regex to match from .novedades__carrusel { up to the broken .tarjeta-noticia block.
const brokenRegex = /\.novedades__carrusel \{\n  position: relative;\n  width: 100%;\n  display: grid;\n  grid-auto-flow: column;\n  grid-auto-columns: 100%;\n  gap: var\(--espacio-sm\);\n  overflow-x: auto;\n  scroll-snap-type: x mandatory;\n  scrollbar-width: none;\n  margin-right: calc\(var\(--espacio-sm\) \* -1\);\n  padding-right: var\(--espacio-sm\);\n\}\n\.novedades__carrusel::-webkit-scrollbar \{\n  display: none;\n\}\n\.tarjeta-noticia \{\n  scroll-snap-align: start;\n/g;

const restoredCode = `.novedades__carrusel {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
}`;

css = css.replace(brokenRegex, restoredCode);

// I also added media queries at the very end of the file for .novedades__carrusel.
// Let's remove them.
css = css.replace(
  /@media \(min-width: 1280px\) \{\n  \.novedades__carrusel \{\n    margin-right: -70px;\n    padding-right: 70px;\n  \}\n\}/g,
  ''
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Reverted novedades carousel and fixed syntax error');
