const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(stylesPath, 'utf8');

// 1. CTA Border Gradient
css = css.replace(
  /\.hero__cta \{\s*background-color: var\(--color-acento\);\s*color: #FFFFFF;\s*padding: var\(--espacio-xs\) var\(--espacio-md\);\s*\}/,
  `.hero__cta {\n  background-color: transparent;\n  color: #FFFFFF;\n  padding: var(--espacio-xs) var(--espacio-md);\n  border: 1px solid;\n  border-image-source: linear-gradient(90deg, #FFFFFF 0%, #2C71FF 100%);\n  border-image-slice: 1;\n}`
);

// Novedades CTA
css = css.replace(
  /\.tarjeta-noticia__cta \{\s*width: fit-content;\s*\}/,
  `.tarjeta-noticia__cta {\n  width: fit-content;\n  background-color: transparent;\n  color: #FFFFFF;\n  padding: var(--espacio-xs) var(--espacio-md);\n  border: 1px solid;\n  border-image-source: linear-gradient(90deg, #FFFFFF 0%, #2C71FF 100%);\n  border-image-slice: 1;\n}`
);


// 2. Decorative lines thickness
css = css.replace(
  /\.titulo-decoracion \{\s*height: 18px;/,
  `.titulo-decoracion {\n  height: 40px;`
);

// 3. Carousel cards size (Encuentros)
css = css.replace(
  /\.tarjeta-evento \{\s*position: relative;\s*min-height: 380px;\s*scroll-snap-align: start;\s*\}/,
  `.tarjeta-evento {\n  position: relative;\n  min-height: 530px;\n  scroll-snap-align: start;\n}`
);

css = css.replace(
  /\.encuentros__contenedor \{\n    grid-auto-columns: calc\(\(100% - \(var\(--espacio-sm\) \* 2\)\) \/ 3\);\n  \}/,
  `.encuentros__contenedor {\n    grid-auto-columns: 396px;\n  }`
);

// 4. Hero Title styling
// CAMPEONES
css = css.replace(
  /\.hero__titulo--outline \{\s*color: transparent;\s*-webkit-text-stroke: 1px #FFFFFF;\s*\}/,
  `.hero__titulo--outline {\n  color: transparent;\n  -webkit-text-stroke: 3px #2C71FF;\n  /* CSS no soporta border-image en texto, usamos un stroke sólido azul simulando el gradiente */\n}`
);

// 2025
css = css.replace(
  /\.hero__titulo--solid \{\s*color: #528FFF; \/\* azul vibrante, tono claro del --gradiente-fondo \*\/\s*\}/,
  `.hero__titulo--solid {\n  color: #528FFF;\n  -webkit-text-stroke: 3px #FFFFFF;\n}`
);


// 5. Sponsors Title styling
css = css.replace(
  /\.sponsors__titulo \{\s*font-size: 3rem;\s*font-weight: 700;\s*color: transparent;\s*-webkit-text-stroke: 1\.5px #FFFFFF;\s*\}/,
  `.sponsors__titulo {\n  font-size: 3rem;\n  font-weight: 700;\n  color: transparent;\n  -webkit-text-stroke: 3px #2C71FF;\n}`
);


fs.writeFileSync(stylesPath, css, 'utf8');
console.log('Applied styling updates.');
