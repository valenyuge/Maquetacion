const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const overrides = `
/* =========================================================================
   FIX HERO IMAGE POSITION ON MOBILE
   ========================================================================= */
@media (max-width: 768px) {
  .hero {
    /* Mueve la imagen hacia arriba para recortar el espacio negro de arriba */
    background-position: center bottom !important;
  }
}
`;

if (!css.includes('FIX HERO IMAGE POSITION ON MOBILE')) {
  css += overrides;
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Hero background position fixed for mobile');
} else {
  console.log('Already fixed');
}
