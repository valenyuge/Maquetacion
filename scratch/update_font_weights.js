const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace all bold/semi-bold weights with regular (400 / normal)
css = css.replace(/font-weight:\s*600;?/g, 'font-weight: normal;');
css = css.replace(/font-weight:\s*700;?/g, 'font-weight: normal;');
css = css.replace(/font-weight:\s*bold;?/g, 'font-weight: normal;');

// Add a safety reset for standard HTML bold tags just in case
css += `
/* Global reset to prevent any bold text as requested */
b, strong, th {
  font-weight: normal;
}
`;

fs.writeFileSync(cssPath, css, 'utf8');
console.log('All bold font weights replaced with normal');
