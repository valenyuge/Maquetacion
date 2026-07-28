const fs = require('fs');
const path = require('path');

// 1. Fix HTML structure
const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// We need to move <div class="container carrusel__controles-wrapper"> OUT of <div class="novedades__carrusel">
// But we also need to wrap novedades__carrusel and the controls in a position:relative container
// so the absolute positioned controls stay with the carousel.

const controlsBlock = `
        <div class="container carrusel__controles-wrapper">
          <div class="carrusel__indicadores" role="tablist" aria-label="Seleccionar noticia">
          <span class="carrusel__indicador carrusel__indicador--activo" role="tab" aria-selected="true" aria-label="Noticia 1"></span>
          <span class="carrusel__indicador" role="tab" aria-selected="false" aria-label="Noticia 2"></span>
          <span class="carrusel__indicador" role="tab" aria-selected="false" aria-label="Noticia 3"></span>
          <span class="carrusel__indicador" role="tab" aria-selected="false" aria-label="Noticia 4"></span>
          <span class="carrusel__indicador" role="tab" aria-selected="false" aria-label="Noticia 5"></span>
        </div>
        </div>
        <button class="carrusel__flecha" aria-label="Siguiente noticia">&gt;</button>
`;

// In my previous fix, I moved the button outside the wrapper. 
// Let's just find the exact block and replace it.

const regexFindControls = /        <div class="container carrusel__controles-wrapper">[\s\S]*?<button class="carrusel__flecha".*?<\/button>\n      <\/div>/;

if (regexFindControls.test(html)) {
  html = html.replace(regexFindControls, `      </div>\n      <!-- Controles moved outside of novedades__carrusel -->\n      ${controlsBlock}`);
}

// Wrap inside a relative div
html = html.replace(
  /<div class="novedades__carrusel"/,
  '<div class="novedades__carrusel-wrapper" style="position: relative; width: 100%;">\n      <div class="novedades__carrusel"'
);

// Close the wrapper after the controls
html = html.replace(
  /        <button class="carrusel__flecha" aria-label="Siguiente noticia">&gt;<\/button>\n    <\/section>/,
  `        <button class="carrusel__flecha" aria-label="Siguiente noticia">&gt;</button>\n      </div>\n    </section>`
);

fs.writeFileSync(htmlPath, html, 'utf8');

// 2. Fix CSS
const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Remove bleed from novedades__carrusel
css = css.replace(
  /  margin-right: calc\(var\(--espacio-sm\) \* -1\);\n  padding-right: var\(--espacio-sm\);\n/g,
  ''
);
css = css.replace(
  /@media \(min-width: 1280px\) \{\n  \.novedades__carrusel \{\n    margin-right: -70px;\n    padding-right: 70px;\n  \}\n\}\n/g,
  ''
);

// We need to adjust script.js to use 100vw instead of padding calculations since it's full width.
// The card takes 100% of screen. The scroll gap is var(--espacio-sm) which is 16px.
// I'll also just remove the gap from novedades__carrusel so it's a seamless 100% width swipe.
css = css.replace(
  /\.novedades__carrusel \{\n  position: relative;\n  width: 100%;\n  display: grid;\n  grid-auto-flow: column;\n  grid-auto-columns: 100%;\n  gap: var\(--espacio-sm\);/g,
  `.novedades__carrusel {\n  position: relative;\n  width: 100%;\n  display: grid;\n  grid-auto-flow: column;\n  grid-auto-columns: 100%;\n  gap: 0; /* Removed gap for seamless 100% width */`
);

fs.writeFileSync(cssPath, css, 'utf8');

// 3. Fix JS scroll math since gap is 0 now
const jsPath = path.join(__dirname, '../script.js');
let js = fs.readFileSync(jsPath, 'utf8');
js = js.replace(/const widthWithGap = contenedorNovedades\.clientWidth \+ 16;/g, 'const widthWithGap = contenedorNovedades.clientWidth;');
fs.writeFileSync(jsPath, js, 'utf8');

console.log('Fixed HTML structure, removed bleed and gap, updated JS math');
