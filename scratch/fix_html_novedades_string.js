const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const startTag = '<div class="container carrusel__controles-wrapper">';
const endTag = '<button class="carrusel__flecha" aria-label="Siguiente noticia">&gt;</button>\n        </div>';

const startIndex = html.indexOf(startTag);
if (startIndex !== -1) {
  // Find the exact end
  const endIndex = html.indexOf(endTag, startIndex) + endTag.length;
  const controlsHTML = html.substring(startIndex, endIndex);

  // Remove it from current location
  html = html.slice(0, startIndex) + html.slice(endIndex);

  // Make section relative
  html = html.replace(
    '<section class="novedades" id="noticias" aria-labelledby="novedades-titulo">',
    '<section class="novedades" id="noticias" aria-labelledby="novedades-titulo" style="position: relative;">'
  );

  // Find the closing div of novedades__carrusel
  // The structure is:
  //      </div>
  //    </section>
  // We'll replace the last occurrence of `    </section>` in that area.
  // Actually, we can just insert `controlsHTML` right before `</section>`
  const insertIndex = html.lastIndexOf('</section>');
  html = html.slice(0, insertIndex) + '  ' + controlsHTML + '\n    ' + html.slice(insertIndex);

  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Fixed DOM with string index');
} else {
  console.log('Could not find start tag');
}
