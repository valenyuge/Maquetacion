const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Append negative margin rules to the very end of the file
css += `
/* Decoration line bleed to the right edge */
.titulo-decoracion {
  margin-right: calc(var(--espacio-sm) * -1);
}
@media (min-width: 1280px) {
  .titulo-decoracion {
    margin-right: -70px;
  }
}
`;

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Decoration bleed CSS applied');
