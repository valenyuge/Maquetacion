const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(stylesPath, 'utf8');

// Modificar el margen negativo para que solape menos
css = css.replace(
  /margin-top: -0\.35em;/g,
  `margin-top: -0.15em;`
);

fs.writeFileSync(stylesPath, css, 'utf8');
console.log('Hero overlap adjusted');
