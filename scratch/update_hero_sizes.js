const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(stylesPath, 'utf8');

// 1. Eliminar font-size del contenedor general (mobile y desktop)
css = css.replace(
  /\.hero__titulo \{\n  font-size: 3\.5rem;\n  line-height: 0\.95;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: fit-content;\n\}/g,
  `.hero__titulo {\n  line-height: 0.95;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: fit-content;\n}`
);

css = css.replace(
  /\.hero__titulo \{\n  font-size: 164px;\n  line-height: 0\.85;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: fit-content;\n\}/g,
  `.hero__titulo {\n  line-height: 0.85;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: fit-content;\n}`
);

// 2. Asignar tamaños base mobile (múltiplos de 8: 56px y 104px)
css = css.replace(
  /\.hero__titulo--outline \{\n  color: transparent;\n  -webkit-text-stroke: 1px #2C71FF;\n\}/g,
  `.hero__titulo--outline {\n  color: transparent;\n  -webkit-text-stroke: 1px #2C71FF;\n  font-size: 56px;\n}`
);

css = css.replace(
  /\.hero__titulo--solid \{\n  color: #528FFF;\n  -webkit-text-stroke: 1px #FFFFFF;\n  margin-top: -0\.35em;\n  position: relative;\n  z-index: 2;\n\}/g,
  `.hero__titulo--solid {\n  color: #528FFF;\n  -webkit-text-stroke: 1px #FFFFFF;\n  margin-top: -0.35em;\n  position: relative;\n  z-index: 2;\n  font-size: 104px;\n}`
);

// 3. Inyectar tamaños desktop en la media query (múltiplos de 8: 160px y 304px)
// 304px es "casi el doble" de 160px (que sería 320px). Ambos son divisibles por 8.
css = css.replace(
  /\.hero__bajada \{ font-size: 20px; \}/g,
  `.hero__titulo--outline { font-size: 160px; }\n  .hero__titulo--solid { font-size: 304px; }\n  .hero__bajada { font-size: 20px; }`
);

fs.writeFileSync(stylesPath, css, 'utf8');
console.log('Hero font sizes updated to multiples of 8');
