const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(
  /\.header \{\n  background-color: #000000;\n  color: #FFFFFF;\n\}/g,
  `.header {\n  background-color: #000000;\n  color: #FFFFFF;\n  position: sticky;\n  top: 0;\n  z-index: 100;\n}`
);

// Add the reset for desktop at the end of the file or before another media query
css = css + `\n/* Desktop header reset (not sticky) */\n@media (min-width: 1280px) {\n  .header {\n    position: relative;\n  }\n}\n`;

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Made header sticky on mobile');
