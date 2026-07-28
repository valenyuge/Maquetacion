const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// The exact block of controls
const controlsRegex = /[ \t]*<div class="container carrusel__controles-wrapper">[\s\S]*?<button class="carrusel__flecha" aria-label="Siguiente noticia">&gt;<\/button>\n[ \t]*<\/div>\n/;

const match = html.match(controlsRegex);
if (match) {
  const controlsHTML = match[0];
  // Remove controls from inside novedades__carrusel
  html = html.replace(controlsRegex, '');

  // Now the end of section looks like:
  //   </div>
  // </section>
  // Which corresponds to closing novedades__carrusel and closing section.
  // We want to insert the controls BETWEEN them, but wrapped inside a relative container.
  
  // Wait, let's just make the <section class="novedades"> relative.
  html = html.replace(
    /<section class="novedades"/,
    '<section class="novedades" style="position: relative;"'
  );

  // Now find the closing </div> of novedades__carrusel which is right before </section>
  html = html.replace(
    /[ \t]*<\/div>\n[ \t]*<\/section>/,
    `      </div>\n${controlsHTML}    </section>`
  );

  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Fixed DOM successfully');
} else {
  console.log('Regex did not match!');
}
