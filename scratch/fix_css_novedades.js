const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(
  /\.novedades__carrusel \{\n  position: relative;\n  width: 100%;\n  display: grid;\n  grid-template-columns: 1fr;\n\}/g,
  `.novedades__carrusel {
  position: relative;
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 100%;
  gap: var(--espacio-sm);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  margin-right: calc(var(--espacio-sm) * -1);
  padding-right: var(--espacio-sm);
}
.novedades__carrusel::-webkit-scrollbar {
  display: none;
}`
);

// Add scroll-snap-align to the card
css = css.replace(
  /\.tarjeta-noticia \{\n  container-type: inline-size;\n  container-name: tarjeta-noticia;\n\}/g,
  `.tarjeta-noticia {\n  container-type: inline-size;\n  container-name: tarjeta-noticia;\n  scroll-snap-align: start;\n}`
);

// Add desktop bleed
if (!css.includes('.novedades__carrusel { margin-right: -70px; }')) {
  css += `
@media (min-width: 1280px) {
  .novedades__carrusel {
    margin-right: -70px;
    padding-right: 70px;
  }
}
`;
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Fixed novedades CSS safely');
