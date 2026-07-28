const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const startTag = '<div class="container carrusel__controles-wrapper">';

const startIndex = html.indexOf(startTag);
if (startIndex !== -1) {
  const flechaIndex = html.indexOf('carrusel__flecha', startIndex);
  const endDivIndex = html.indexOf('</div>', flechaIndex);
  const endIndex = endDivIndex + 6; // include </div>
  
  if (endIndex > startIndex) {
    const controlsHTML = html.substring(startIndex, endIndex);

    // Remove from original place
    const beforeControls = html.substring(0, startIndex);
    const afterControls = html.substring(endIndex);
    html = beforeControls + afterControls;

    const sectionCloseIndex = html.indexOf('</section>', startIndex);
    
    if (sectionCloseIndex !== -1) {
      // Insert controls right before </section>
      html = html.substring(0, sectionCloseIndex) + '\n      <!-- Controles seguros -->\n      ' + controlsHTML + '\n    ' + html.substring(sectionCloseIndex);
      
      // Also add position: relative to the section so absolute positioning works
      html = html.replace(
        '<section class="novedades" id="noticias" aria-labelledby="novedades-titulo">',
        '<section class="novedades" id="noticias" aria-labelledby="novedades-titulo" style="position: relative;">'
      );

      fs.writeFileSync(htmlPath, html, 'utf8');
      console.log('HTML fixed safely without duplication');
    } else {
      console.log('Could not find </section>');
    }
  } else {
    console.log('End index invalid');
  }
} else {
  console.log('Controls not found in HTML');
}
