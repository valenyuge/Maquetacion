const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../index.html');
const stylesPath = path.join(__dirname, '../styles.css');
const scriptPath = path.join(__dirname, '../script.js');

let html = fs.readFileSync(indexPath, 'utf8');
let css = fs.readFileSync(stylesPath, 'utf8');
let js = fs.readFileSync(scriptPath, 'utf8');

// --- HTML UPDATES ---

// 1. Add arrow to encuentros
html = html.replace(
  /<div class="encuentros__contenedor">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/,
  '<div class="encuentros__contenedor" id="encuentros-scroll">$1</div>\n        <button class="carrusel-encuentros__flecha" aria-label="Deslizar siguientes eventos">&gt;</button>\n      </div>\n    </section>'
);

// We need to add position relative to the encuentros .container so the absolute arrow works
html = html.replace(
  /<section class="encuentros" aria-labelledby="encuentros-titulo">\s*<div class="container">/,
  '<section class="encuentros" aria-labelledby="encuentros-titulo">\n      <div class="container" style="position: relative;">'
);

// 2. Fix novedades encabezado (remove button and add flex-grow to decoracion)
const newNovedadesEncabezado = `<div class="novedades__encabezado" style="display: flex; align-items: center; gap: var(--espacio-sm);">
          <h2 class="novedades__titulo" id="novedades-titulo" style="white-space: nowrap;">Mantenete al tanto</h2>
          <div class="novedades__decoracion titulo-decoracion" aria-hidden="true" style="flex-grow: 1;"></div>
        </div>`;
html = html.replace(
  /<div class="novedades__encabezado">[\s\S]*?<\/a>\s*<\/div>/,
  newNovedadesEncabezado
);

fs.writeFileSync(indexPath, html, 'utf8');


// --- CSS UPDATES ---

// Add styles for carrusel-encuentros__flecha
const arrowStyles = `
/* Flecha encuentros */
.carrusel-encuentros__flecha {
  position: absolute;
  top: 50%;
  right: var(--espacio-sm);
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-acento);
  color: #FFFFFF;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}

@media (min-width: 1280px) {
  .carrusel-encuentros__flecha {
    right: 70px;
  }
}

.encuentros__contenedor {
  scroll-behavior: smooth;
}
`;

css += arrowStyles;
fs.writeFileSync(stylesPath, css, 'utf8');


// --- JS UPDATES ---

// Add logic for encuentros arrow
const jsAddition = `
    // ==========================================
    // LÓGICA DEL CARRUSEL DE ENCUENTROS
    // ==========================================
    const contenedorEncuentros = document.getElementById("encuentros-scroll");
    const flechaEncuentros = document.querySelector(".carrusel-encuentros__flecha");

    if (flechaEncuentros && contenedorEncuentros) {
        flechaEncuentros.addEventListener("click", () => {
            // Obtenemos el ancho de una tarjeta usando el primer hijo
            const tarjetaWidth = contenedorEncuentros.firstElementChild.offsetWidth;
            // Sumamos el gap aproximado (ej. 16px) o simplemente deslizamos el ancho de la tarjeta entera
            const scrollAmount = tarjetaWidth + 16;
            
            // Verificamos si estamos cerca del final para volver al inicio, o simplemente avanzar
            if (contenedorEncuentros.scrollLeft + contenedorEncuentros.clientWidth >= contenedorEncuentros.scrollWidth - 10) {
                contenedorEncuentros.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                contenedorEncuentros.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        });
    }
`;

js = js.replace('});', jsAddition + '\n});');

fs.writeFileSync(scriptPath, js, 'utf8');

console.log('Fixed arrow and decorative bar');
