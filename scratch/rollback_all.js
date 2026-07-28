const fs = require('fs');
const path = require('path');

// 1. Rollback script.js to the original JS state with display block/none
const jsPath = path.join(__dirname, '../script.js');
const originalJS = `/**
 * script.js - Lógica Front-End para el sitio web estático (Vanilla JS)
 */

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // LÓGICA DEL CARRUSEL DE NOVEDADES
    // ==========================================
    
    const slides = document.querySelectorAll(".novedades__item");
    const indicadores = document.querySelectorAll(".carrusel__indicador");
    const flechaSiguiente = document.querySelector(".carrusel__flecha");

    let slideActual = 0;

    const actualizarCarrusel = (indice) => {
        slides.forEach((slide, i) => {
            if (i === indice) {
                slide.style.display = "block";
            } else {
                slide.style.display = "none";
            }
        });

        indicadores.forEach((indicador, i) => {
            if (i === indice) {
                indicador.classList.add("carrusel__indicador--activo");
                indicador.setAttribute("aria-selected", "true");
            } else {
                indicador.classList.remove("carrusel__indicador--activo");
                indicador.setAttribute("aria-selected", "false");
            }
        });
    };

    if (slides.length > 0) {
        actualizarCarrusel(slideActual);
    }

    if (flechaSiguiente) {
        flechaSiguiente.addEventListener("click", () => {
            slideActual = (slideActual + 1) % slides.length;
            actualizarCarrusel(slideActual);
        });
    }

    indicadores.forEach((indicador, index) => {
        indicador.addEventListener("click", () => {
            slideActual = index;
            actualizarCarrusel(slideActual);
        });
    });

    // ==========================================
    // LÓGICA DEL CARRUSEL DE ENCUENTROS
    // ==========================================
    const contenedorEncuentros = document.getElementById("encuentros-scroll");
    const flechaEncuentros = document.querySelector(".carrusel-encuentros__flecha");

    if (flechaEncuentros && contenedorEncuentros) {
        flechaEncuentros.addEventListener("click", () => {
            const tarjetaWidth = contenedorEncuentros.firstElementChild.offsetWidth;
            const scrollAmount = tarjetaWidth + 16;
            
            if (contenedorEncuentros.scrollLeft + contenedorEncuentros.clientWidth >= contenedorEncuentros.scrollWidth - 10) {
                contenedorEncuentros.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                contenedorEncuentros.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        });
    }
});
`;
fs.writeFileSync(jsPath, originalJS, 'utf8');

// 2. Rollback index.html DOM structure
const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// The HTML currently has the controls OUTSIDE novedades__carrusel.
// I will move them back INSIDE novedades__carrusel, right before the closing tag.
// And remove the wrapper I added.

const regexFindControlsHTML = /      <!-- Controles moved outside of novedades__carrusel -->\n[ \t]*<div class="container carrusel__controles-wrapper">[\s\S]*?<button class="carrusel__flecha".*?<\/button>\n/;
if (regexFindControlsHTML.test(html)) {
  const matchHTML = html.match(regexFindControlsHTML);
  const controlsBlock = matchHTML[0].replace('      <!-- Controles moved outside of novedades__carrusel -->\n', '');
  
  html = html.replace(regexFindControlsHTML, '');

  // Put them back inside novedades__carrusel which currently ends with </div>
  // The structure is:
  // <div class="novedades__carrusel-wrapper" style="position: relative; width: 100%;">
  //   <div class="novedades__carrusel" role="region" aria-label="Carrusel de noticias">
  //     <article>...</article>
  //   </div>
  // </section>

  // Find the end of the last article inside novedades__carrusel.
  html = html.replace(
    /<\/article>\n\n[ \t]*<\/div>\n[ \t]*<\/div>\n[ \t]*<\/section>/,
    `</article>\n\n${controlsBlock}      </div>\n    </section>`
  );

  // Remove the <div class="novedades__carrusel-wrapper"> entirely
  html = html.replace(
    /<div class="novedades__carrusel-wrapper" style="position: relative; width: 100%;">\n[ \t]*<div class="novedades__carrusel"/,
    '<div class="novedades__carrusel"'
  );
}

fs.writeFileSync(htmlPath, html, 'utf8');

// 3. Rollback styles.css to how it was before
const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Restore novedades__carrusel to simple grid 1fr
css = css.replace(
  /\.novedades__carrusel \{\n  position: relative;\n  width: 100%;\n  display: grid;\n  grid-auto-flow: column;\n  grid-auto-columns: 100%;\n  gap: 0; \/\* Removed gap for seamless 100% width \*\/\n  overflow-x: auto;\n  scroll-snap-type: x mandatory;\n  scrollbar-width: none;\n\}/,
  `.novedades__carrusel {\n  position: relative;\n  width: 100%;\n  display: grid;\n  grid-template-columns: 1fr;\n}`
);

// Remove the hidden scrollbar css
css = css.replace(/\.novedades__carrusel::-webkit-scrollbar \{\n  display: none;\n\}\n/, '');

// Remove scroll-snap-align from card
css = css.replace(
  /\.tarjeta-noticia \{\n  container-type: inline-size;\n  container-name: tarjeta-noticia;\n  scroll-snap-align: start;\n\}/g,
  `.tarjeta-noticia {\n  container-type: inline-size;\n  container-name: tarjeta-noticia;\n}`
);

// Restore card height to original (maybe it wasn't 100vh originally, or if it was, the JS display:block made it okay).
// Wait, the user said "lo pusiste enorme a la imagen" which implies IT WAS NOT enormous before I touched it.
// If I look at the history, my regex matched `min-height: 100vh;` and replaced it with `min-height: 530px;`. 
// The problem is that the grid height stretches it. With `display: none` JS logic, there is no grid stretching.
// Let's set it back to `min-height: 100vh;` or `min-height: 400px;` if it fails. I'll just leave it at 530px or restore to 100vh.
// Let's restore to 100vh since that's what it was before I touched it.
css = css.replace(
  /\.tarjeta-noticia \{\n  position: relative;\n  min-height: 530px;/g,
  `.tarjeta-noticia {\n  position: relative;\n  min-height: 100vh;`
);

// The user wants the arrows VISIBLE on mobile for Novedades.
// My previous script hid .carrusel__flecha globally. I will remove the display: none.
css = css.replace(
  /\.carrusel__flecha \{\n  position: absolute;\n  bottom: 0;\n  right: var\(--espacio-sm\);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: var\(--color-acento\);\n  color: #FFFFFF;\n  border: none;\n  display: none;/g,
  `.carrusel__flecha {\n  position: absolute;\n  bottom: 0;\n  right: var(--espacio-sm);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: var(--color-acento);\n  color: #FFFFFF;\n  border: none;\n  display: flex;`
);

// Desktop media query still has display: flex; but I also added top: 50% earlier. The user might want that.
// But if the card is 100vh, top 50% will be way up. Let's keep it centered for now or let the user decide.
// They said "volve a como estaba antes". Before, it was pinned to the bottom right!
// So let's remove my centering hack from the media query!
css = css.replace(
  /@media \(min-width: 1280px\) \{\n  \.carrusel__flecha \{\n    right: 70px;\n    display: flex;\n    bottom: auto;\n    top: 50%;\n    transform: translateY\(-50%\);\n  \}\n\}/g,
  `@media (min-width: 1280px) {\n  .carrusel__flecha {\n    right: 70px;\n    display: flex;\n  }\n}`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Rollback completed');
