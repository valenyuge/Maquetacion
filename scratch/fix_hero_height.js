const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// The hack I added earlier:
// @media (max-width: 768px) {
//   .hero {
//     margin-top: -60px !important;
//     background-size: 200% !important;
//     background-position: center bottom !important;
//   }
// }

// We want to replace it with a proper fix that ELIMINATES the empty space by reducing the height of the hero section.

css = css.replace(
  /\/\* =========================================================================\n   FIX HERO CROP \(Subir la portada y recortar espacio negro\)\n   ========================================================================= \*\/\n@media \(max-width: 768px\) \{\n  \.hero \{\n    \/\* Mueve la seccion un poco hacia arriba para meterse abajo del header \*\/\n    margin-top: -60px !important;\n    \n    \/\* Hace zoom a la imagen y la alinea abajo para recortar el techo negro \*\/\n    background-size: 200% !important;\n    background-position: center bottom !important;\n  \}\n\}/,
  `/* =========================================================================
   FIX HERO HEIGHT (Eliminar espacio vacío reduciendo la altura)
   ========================================================================= */
@media (max-width: 768px) {
  .hero {
    /* Eliminamos el espacio vacio reduciendo drásticamente la altura de la sección */
    min-height: 50vh !important;
    padding-top: var(--espacio-sm) !important;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
  }
}`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Hero height fixed and repeat eliminated');
