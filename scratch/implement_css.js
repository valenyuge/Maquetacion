const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Change .novedades__carrusel to be a grid
css = css.replace(
  /\.novedades__carrusel \{\n  position: relative;\n  width: 100%;\n  display: grid;\n  grid-template-columns: 1fr;\n\}/g,
  `.novedades__carrusel {\n  position: relative;\n  width: 100%;\n  display: grid;\n  grid-auto-flow: column;\n  grid-auto-columns: 100%;\n  gap: 0;\n  overflow-x: auto;\n  scroll-snap-type: x mandatory;\n  scrollbar-width: none;\n}\n.novedades__carrusel::-webkit-scrollbar {\n  display: none;\n}`
);

// Add scroll-snap-align to tarjeta-noticia
css = css.replace(
  /\.tarjeta-noticia \{\n  container-type: inline-size;\n  container-name: tarjeta-noticia;\n\}/g,
  `.tarjeta-noticia {\n  container-type: inline-size;\n  container-name: tarjeta-noticia;\n  scroll-snap-align: start;\n}`
);

// Fix the enormous min-height
css = css.replace(
  /\.tarjeta-noticia \{\n  position: relative;\n  min-height: 100vh;/g,
  `.tarjeta-noticia {\n  position: relative;\n  min-height: 530px;`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('CSS updated successfully');
