const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const overrides = `
/* =========================================================================
   FIX HERO CROP (Subir la portada y recortar espacio negro)
   ========================================================================= */
@media (max-width: 768px) {
  .hero {
    /* Mueve la seccion un poco hacia arriba para meterse abajo del header */
    margin-top: -60px !important;
    
    /* Hace zoom a la imagen y la alinea abajo para recortar el techo negro */
    background-size: 200% !important;
    background-position: center bottom !important;
  }
}
`;

css += overrides;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Hero cropped and moved up');
