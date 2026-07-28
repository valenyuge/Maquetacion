const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Apply right bleed to titulo-decoracion
css = css.replace(
  /\.titulo-decoracion \{\n  height: 40px;/g,
  `.titulo-decoracion {\n  height: 40px;\n  margin-right: calc(var(--espacio-sm) * -1);`
);

// Apply right bleed to encuentros__contenedor
css = css.replace(
  /\.encuentros__contenedor \{\n  display: grid;/g,
  `.encuentros__contenedor {\n  display: grid;\n  margin-right: calc(var(--espacio-sm) * -1);\n  padding-right: var(--espacio-sm);`
);

// Increase the height of the news card to 630px
css = css.replace(
  /\.tarjeta-noticia \{\n  container-type: inline-size;\n  container-name: tarjeta-noticia;\n  scroll-snap-align: start;\n\}/g,
  `.tarjeta-noticia {\n  container-type: inline-size;\n  container-name: tarjeta-noticia;\n  scroll-snap-align: start;\n}` // No change here actually, the height is in a different block
);

css = css.replace(
  /\.tarjeta-noticia \{\n  position: relative;\n  min-height: 530px;/g,
  `.tarjeta-noticia {\n  position: relative;\n  min-height: 630px;`
);

// Add desktop bleed rules at the end of the file
css += `
@media (min-width: 1280px) {
  .titulo-decoracion,
  .encuentros__contenedor {
    margin-right: -70px;
  }
  .encuentros__contenedor {
    padding-right: 70px;
  }
}
`;

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Fixed bleed and height');
