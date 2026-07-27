const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(stylesPath, 'utf8');

// Modificar el gradiente de sponsors
css = css.replace(
  /linear-gradient\(to bottom, #000000 40%, rgba\(0, 0, 0, 0\.5\)\)/g,
  `linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0) 100%)`
);

fs.writeFileSync(stylesPath, css, 'utf8');
console.log('Sponsors gradient updated to black to transparent');
