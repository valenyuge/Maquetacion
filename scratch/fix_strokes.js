const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(stylesPath, 'utf8');

// CAMPEONES
css = css.replace(
  /\.hero__titulo--outline \{\n  color: transparent;\n  -webkit-text-stroke: 3px #2C71FF;\n  \/\* CSS no soporta border-image en texto, usamos un stroke sólido azul simulando el gradiente \*\/\n\}/,
  `.hero__titulo--outline {\n  color: transparent;\n  -webkit-text-stroke: 1px #2C71FF; /* Borde finito. (El gradiente en el borde del texto no es posible en CSS sin SVG) */\n}`
);

// 2025
css = css.replace(
  /\.hero__titulo--solid \{\n  color: #528FFF;\n  -webkit-text-stroke: 3px #FFFFFF;\n\}/,
  `.hero__titulo--solid {\n  color: #528FFF;\n  -webkit-text-stroke: 1px #FFFFFF;\n}`
);

// Sponsors
css = css.replace(
  /\.sponsors__titulo \{\n  font-size: 3rem;\n  font-weight: 700;\n  color: transparent;\n  -webkit-text-stroke: 3px #2C71FF;\n\}/,
  `.sponsors__titulo {\n  font-size: 3rem;\n  font-weight: 700;\n  color: transparent;\n  -webkit-text-stroke: 1px #2C71FF;\n}`
);

fs.writeFileSync(stylesPath, css, 'utf8');
console.log('Fixed stroke widths');
