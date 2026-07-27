const fs = require('fs');
const path = require('path');

const stylesCssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(stylesCssPath, 'utf8');

css = css.replace(
  /\.header \{\s*display: grid;\s*grid-template-columns: 1fr;\s*gap: var\(--espacio-sm\);\s*padding: var\(--espacio-sm\);\s*\}/,
  `.header__container {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: var(--espacio-sm);\n  padding: var(--espacio-sm) 0;\n}`
);

css = css.replace(
  /\.header \{\s*grid-template-columns: auto 1fr;\s*align-items: center;\s*justify-content: space-between;\s*padding: var\(--espacio-sm\) var\(--espacio-lg\);\s*\}/,
  `.header__container {\n    grid-template-columns: auto 1fr;\n    align-items: center;\n    justify-content: space-between;\n    padding: var(--espacio-sm) 0;\n  }`
);

fs.writeFileSync(stylesCssPath, css, 'utf8');

console.log('Fixed styles.css for header container');
