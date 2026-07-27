const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(stylesPath, 'utf8');

// 1. Modificar altura de la tarjeta de noticia (carrusel) a 100vh
css = css.replace(
  /\.tarjeta-noticia \{\n  position: relative;\n  min-height: 500px;/g,
  `.tarjeta-noticia {\n  position: relative;\n  min-height: 100vh;`
);

// 2. Ajustar el fade a negro hacia abajo desde el 80%
css = css.replace(
  /linear-gradient\(to top right, rgba\(0, 0, 0, 0\.9\) 0%, rgba\(0, 0, 0, 0\.2\) 60%\)/g,
  `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 80%, #000000 100%)`
);

fs.writeFileSync(stylesPath, css, 'utf8');
console.log('Secciones ajustadas correctamente.');
