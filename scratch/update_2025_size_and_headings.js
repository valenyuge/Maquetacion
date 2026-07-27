const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
const cssPath = path.join(__dirname, '../styles.css');

let html = fs.readFileSync(htmlPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Decrease 2025 size and add letter spacing in HTML
html = html.replace(
  /font-size: 304px;">2025<\/text>/,
  `font-size: 280px;" letter-spacing="15px">2025</text>`
);

// 2. Decrease 2025 size in CSS (media query)
css = css.replace(
  /\.hero__titulo--solid \{ font-size: 304px; \}/g,
  `.hero__titulo--solid { font-size: 280px; }`
);

// 3. Fix bolding on Bebas Neue titles
// Add a global rule to reset font-weight for titles
css += `
/* Ensure Bebas Neue does not get faux-bolded by browser heading styles */
h1, h2, h3, h4, h5, h6, .seccion__titulo, .encuentros__titulo, .novedades__titulo {
  font-weight: normal;
}
`;

fs.writeFileSync(htmlPath, html, 'utf8');
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Fixed 2025 size, spacing, and heading weights');
