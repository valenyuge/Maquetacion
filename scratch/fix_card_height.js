const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// The card was mistakenly set to 100vh which takes up the whole screen height.
// I will change it to 530px, the same height used for the event cards.
css = css.replace(
  /\.tarjeta-noticia \{\n  position: relative;\n  min-height: 100vh;/g,
  `.tarjeta-noticia {\n  position: relative;\n  min-height: 530px;`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Fixed enormous card height');
