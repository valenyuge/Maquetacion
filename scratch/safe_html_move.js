const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// The exact string to find and extract
const startTag = '<div class="container carrusel__controles-wrapper">';
const endTag = '<button class="carrusel__flecha" aria-label="Siguiente noticia">&gt;</button>\n        </div>';

const startIndex = html.indexOf(startTag);
if (startIndex !== -1) {
  const endIndex = html.indexOf(endTag, startIndex) + endTag.length;
  const controlsHTML = html.substring(startIndex, endIndex);

  // Remove the block from its original location
  html = html.substring(0, startIndex) + html.substring(endIndex);

  // Find the exact closing tags of the section
  // It looks like:
  //       </div>
  //     </section>
  
  // We can just find the LAST </section> in the file that corresponds to novedades.
  // Actually, we can find the section header and then find its closing tag.
  const sectionStart = html.indexOf('<section class="novedades"');
  if (sectionStart !== -1) {
    const sectionEnd = html.indexOf('</section>', sectionStart);
    
    // We insert the controls right before the </section>
    html = html.substring(0, sectionEnd) + '\n      ' + controlsHTML + '\n    ' + html.substring(sectionEnd);

    // Make the section relative
    html = html.replace(
      /<section class="novedades".*?>/,
      '<section class="novedades" id="noticias" aria-labelledby="novedades-titulo" style="position: relative;">'
    );

    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('HTML safely moved');
  } else {
    console.log('Could not find section novedades');
  }
} else {
  console.log('Controls not found');
}
