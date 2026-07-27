const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(
  /linear-gradient\(to top, #000000 0%, transparent 10%\)/g,
  `linear-gradient(to top, #000000 0%, transparent 4%)`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Bottom fade reduced to 4%');
