const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Append negative margin rules to the very end of the file
css += `
/* Carousel bleed to the right edge */
.encuentros__contenedor {
  margin-right: calc(var(--espacio-sm) * -1);
  padding-right: var(--espacio-sm);
}
@media (min-width: 1280px) {
  .encuentros__contenedor {
    margin-right: -70px;
    padding-right: 70px;
  }
}
`;

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Carousel bleed CSS applied');
