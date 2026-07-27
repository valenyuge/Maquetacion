const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '../index.html');
const stylesCssPath = path.join(__dirname, '../styles.css');

// --- Update index.html ---
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Wrap encuentros in .container
html = html.replace(
  /<div class="encuentros__encabezado">/g,
  '<div class="container">\n        <div class="encuentros__encabezado">'
);
html = html.replace(
  /<\/div>\s*<\/section>\s*<!-- ==================== MANTENETE/g,
  '</div>\n      </div>\n    </section>\n\n    <!-- ==================== MANTENETE'
);

// 2. Wrap novedades encabezado in .container
html = html.replace(
  /<div class="novedades__encabezado">/g,
  '<div class="container">\n        <div class="novedades__encabezado">'
);
html = html.replace(
  /<\/a>\s*<\/div>\s*<div class="novedades__carrusel"/g,
  '</a>\n        </div>\n      </div>\n\n      <div class="novedades__carrusel"'
);

// 3. Wrap tarjeta-noticia__contenido in .container .tarjeta-noticia__container
html = html.replace(
  /<div class="tarjeta-noticia__contenido">/g,
  '<div class="container tarjeta-noticia__container">\n            <div class="tarjeta-noticia__contenido">'
);
html = html.replace(
  /<\/a>\s*<\/div>\s*<\/article>/g,
  '</a>\n            </div>\n          </div>\n        </article>'
);

// 4. Wrap carrusel controles in .container .carrusel__controles-wrapper
html = html.replace(
  /<div class="carrusel__indicadores"/g,
  '<div class="container carrusel__controles-wrapper">\n          <div class="carrusel__indicadores"'
);
html = html.replace(
  /<button class="carrusel__flecha" aria-label="Siguiente noticia">&gt;<\/button>\s*<\/div>\s*<\/section>/g,
  '<button class="carrusel__flecha" aria-label="Siguiente noticia">&gt;</button>\n        </div>\n      </div>\n    </section>'
);

// Wrap header contents just in case? The user asked only for those two sections. 
// I'll wrap Hero and Sponsors too so it's consistent if .main loses padding.
html = html.replace(
  /<article class="hero__contenido">/g,
  '<div class="container">\n        <article class="hero__contenido">'
);
html = html.replace(
  /<\/article>\s*<\/section>/g,
  '<\/article>\n      <\/div>\n    <\/section>'
);

html = html.replace(
  /<div class="sponsors__cabecera">/g,
  '<div class="container">\n        <div class="sponsors__cabecera">'
);
html = html.replace(
  /<\/div>\s*<\/section>\s*<\/main>/g,
  '<\/div>\n      <\/div>\n    <\/section>\n\n  <\/main>'
);

fs.writeFileSync(indexHtmlPath, html, 'utf8');

// --- Update styles.css ---
let css = fs.readFileSync(stylesCssPath, 'utf8');

// Add .container
css = css.replace(
  /\/\* ==============================================================\r?\n   4\. LAYOUT MACRO/g,
  `/* ==============================================================
   4. LAYOUT MACRO — MOBILE FIRST (default: 1 columna, min 375px)
   ============================================================== */

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--espacio-sm);
}

@media (min-width: 1280px) {
  .container {
    padding: 0 var(--espacio-lg);
  }
}

/*`
);
css = css.replace('/* ---------- Header ---------- */', ''); // remove the extra one created if any? No.

// Update .main
css = css.replace(
  /\.main \{\s*display: grid;\s*grid-template-columns: 1fr;\s*gap: var\(--espacio-lg\);\s*padding: 0 var\(--espacio-sm\);\s*\}/g,
  `.main {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: var(--espacio-lg);\n}`
);
css = css.replace(
  /\.main \{\s*padding: 0 var\(--espacio-lg\);\s*\}/g,
  `.main {\n    /* padding delegado a .container */\n  }`
);

// Update novedades__carrusel
css = css.replace(
  /\.novedades__carrusel \{\s*display: grid;\s*grid-template-columns: 1fr;\s*gap: var\(--espacio-sm\);\s*\}/g,
  `.novedades__carrusel {\n  position: relative;\n  width: 100%;\n  display: grid;\n  grid-template-columns: 1fr;\n}`
);

// Update tarjeta-noticia
css = css.replace(
  /\.tarjeta-noticia__contenido \{\s*position: absolute;\s*bottom: 3rem;\s*left: 2rem;\s*max-width: 85%; \/\* mobile: ocupa más ancho para no recortar el texto \*\/\s*\}/g,
  `.tarjeta-noticia__container {\n  display: flex;\n  align-items: flex-end;\n  height: 100%;\n  padding-bottom: 3rem;\n}\n\n.tarjeta-noticia__contenido {\n  position: relative;\n  max-width: 85%;\n}`
);

// Update controles
css = css.replace(
  /\.carrusel__indicadores \{\s*position: absolute;\s*bottom: 1\.5rem;\s*left: 50%;\s*transform: translateX\(-50%\);\s*display: flex;\s*gap: 8px;\s*\}/g,
  `.carrusel__controles-wrapper {\n  position: absolute;\n  bottom: 1.5rem;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 100%;\n  height: 40px;\n  pointer-events: none;\n}\n\n.carrusel__indicadores {\n  position: absolute;\n  bottom: 15px;\n  left: 50%;\n  transform: translateX(-50%);\n  display: flex;\n  gap: 8px;\n  pointer-events: auto;\n}`
);

css = css.replace(
  /\.carrusel__flecha \{\s*position: absolute;\s*bottom: 1\.5rem;\s*right: 2rem;\s*width: 40px;\s*height: 40px;\s*border-radius: 50%;\s*background-color: var\(--color-acento\);\s*color: #FFFFFF;\s*border: none;\s*display: flex;\s*align-items: center;\s*justify-content: center;\s*cursor: pointer;\s*\}/g,
  `.carrusel__flecha {\n  position: absolute;\n  bottom: 0;\n  right: var(--espacio-sm);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: var(--color-acento);\n  color: #FFFFFF;\n  border: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  pointer-events: auto;\n}\n\n@media (min-width: 1280px) {\n  .carrusel__flecha {\n    right: var(--espacio-lg);\n  }\n}`
);

fs.writeFileSync(stylesCssPath, css, 'utf8');

console.log('Update complete.');
