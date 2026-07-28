const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(
  /\.novedades__carrusel \{\n  position: relative;\n  width: 100%;\n  display: grid;\n  grid-template-columns: 1fr;\n\}/g,
  `.novedades__carrusel {\n  position: relative;\n  width: 100%;\n  display: grid;\n  grid-auto-flow: column;\n  grid-auto-columns: 100%;\n  gap: var(--espacio-sm);\n  overflow-x: auto;\n  scroll-snap-type: x mandatory;\n  scrollbar-width: none;\n  margin-right: calc(var(--espacio-sm) * -1);\n  padding-right: var(--espacio-sm);\n}\n.novedades__carrusel::-webkit-scrollbar {\n  display: none;\n}\n.tarjeta-noticia {\n  scroll-snap-align: start;\n`
);

css += `
@media (min-width: 1280px) {
  .novedades__carrusel {
    margin-right: -70px;
    padding-right: 70px;
  }
}
`;

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Novedades carousel made swipeable');
