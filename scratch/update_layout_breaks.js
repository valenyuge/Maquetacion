const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
const cssPath = path.join(__dirname, '../styles.css');

let html = fs.readFileSync(htmlPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Line break after 'tolosano'
html = html.replace(
  /Tolosano /g,
  `Tolosano<br>`
);

html = html.replace(
  /tolosano /g,
  `tolosano<br>`
);

// 2. Line break after 'nuestro club'
html = html.replace(
  /nuestro club /g,
  `nuestro club<br>`
);

html = html.replace(
  /Nuestro club /g,
  `Nuestro club<br>`
);

// 3. Fix Sponsors text overlap
// Let's ensure the SVG h2 doesn't collapse to 0 width or overlap the paragraph.
// We can give the h2 a strict min-width and ensure the paragraph has a margin.
css += `
.sponsors__cabecera {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.sponsors__titulo {
  flex: 0 0 auto;
  min-width: 450px;
}
.sponsors__texto {
  flex: 1 1 auto;
  margin-left: 2rem;
}
`;

fs.writeFileSync(htmlPath, html, 'utf8');
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Added line breaks and fixed sponsors layout overlap');
