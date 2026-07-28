const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Convert novedades__carrusel to swipeable grid.
// Make sure to remove any negative margin bleeds.
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

// Ensure the arrows are visible on mobile (remove display: none if present)
css = css.replace(
  /\.carrusel__flecha \{\n  position: absolute;\n  bottom: 0;\n  right: var\(--espacio-sm\);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: var\(--color-acento\);\n  color: #FFFFFF;\n  border: none;\n  display: none;/g,
  `.carrusel__flecha {\n  position: absolute;\n  bottom: 0;\n  right: var(--espacio-sm);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: var(--color-acento);\n  color: #FFFFFF;\n  border: none;\n  display: flex;`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('CSS prepared successfully');
