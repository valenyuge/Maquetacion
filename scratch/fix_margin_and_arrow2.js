const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Move .carrusel__flecha outside of .carrusel__controles-wrapper so it can be vertically centered on the whole section
html = html.replace(
  /        <button class="carrusel__flecha" aria-label="Siguiente noticia">&gt;<\/button>\n        <\/div>\n      <\/div>\n    <\/section>/g,
  `        </div>\n        <button class="carrusel__flecha" aria-label="Siguiente noticia">&gt;</button>\n      </div>\n    </section>`
);

fs.writeFileSync(htmlPath, html, 'utf8');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Add margin-bottom to encuentros__encabezado so it matches the gap in novedades
css = css.replace(
  /\.encuentros__encabezado \{\n  display: flex;\n  align-items: center;\n  gap: var\(--espacio-sm\);\n\}/g,
  `.encuentros__encabezado {\n  display: flex;\n  align-items: center;\n  gap: var(--espacio-sm);\n  margin-bottom: var(--espacio-md);\n}`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Fixed margin via margin-bottom, moved arrow in DOM');
