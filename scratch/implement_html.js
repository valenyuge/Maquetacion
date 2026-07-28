const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// The HTML currently has the controls inside novedades__carrusel.
// Let's use string manipulation to be safe.

const startControlsStr = '<div class="container carrusel__controles-wrapper">';
const endControlsStr = '<button class="carrusel__flecha" aria-label="Siguiente noticia">&gt;</button>\n        </div>';

const startIndex = html.indexOf(startControlsStr);
if (startIndex !== -1) {
  const endIndex = html.indexOf(endControlsStr, startIndex) + endControlsStr.length;
  const controlsHTML = html.substring(startIndex, endIndex);

  // Remove controls
  html = html.slice(0, startIndex) + html.slice(endIndex);

  // Add position: relative to section
  html = html.replace(
    '<section class="novedades" id="noticias" aria-labelledby="novedades-titulo">',
    '<section class="novedades" id="noticias" aria-labelledby="novedades-titulo" style="position: relative;">'
  );

  // Insert controls just before the closing tag of the section
  const sectionCloseIndex = html.lastIndexOf('</section>');
  html = html.slice(0, sectionCloseIndex) + '      <!-- Controles moved outside -->\n      ' + controlsHTML + '\n    ' + html.slice(sectionCloseIndex);

  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('HTML updated successfully');
} else {
  console.log('Controls not found in HTML, maybe already moved?');
}
