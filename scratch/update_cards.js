const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Replace the icons and text in the meta items of "Próximos Encuentros" cards
const newMetaBlock = `<div class="tarjeta-evento__meta">
              <span class="tarjeta-evento__meta-item">
                <img src="imagenes/lugar.png" alt="" style="width: 16px; height: 16px; object-fit: contain;"> Círculo Cultural Tolosano
              </span>
              <span class="tarjeta-evento__meta-item">
                <img src="imagenes/hora.png" alt="" style="width: 16px; height: 16px; object-fit: contain;"> 20 de Junio – 20:00 HS
              </span>
              <span class="tarjeta-evento__meta-item">
                <img src="imagenes/calendario.png" alt="" style="width: 16px; height: 16px; object-fit: contain;"> Primer fecha
              </span>
            </div>`;

html = html.replace(/<div class="tarjeta-evento__meta">[\s\S]*?<\/div>/g, newMetaBlock);

// 2. Change the gradient direction on the inline styles for Eventos and Noticias
html = html.replace(
  /linear-gradient\(to top, rgba\(0, 0, 0, 0\.9\) 0%, rgba\(0, 0, 0, 0\) 50%\)/g,
  `linear-gradient(to bottom, rgba(0,0,0,0) 0%, #000000 60%, #000000 100%)`
);
html = html.replace(
  /linear-gradient\(to top, #000000 0%, transparent 100%\)/g,
  `linear-gradient(to bottom, rgba(0,0,0,0) 0%, #000000 60%, #000000 100%)`
);

// 3. Shift 2025 slightly left to visually center it (compensating for kerning)
// Change x="50%" to x="48%"
html = html.replace(
  /<text x="50%"([^>]*aria-label="2025"|[^>]*2025<\/text>)/g,
  `<text x="47%"$1`
);
// In my previous script I didn't match aria-label inside the text, it's outside. Let's do a direct replace.
if (html.includes('>2025</text>')) {
  html = html.replace(
    /<text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#528FFF" stroke="url\(#grad2025\)" stroke-width="8" stroke-linejoin="round" paint-order="stroke fill" letter-spacing="7\.5px"/g,
    `<text x="47.5%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#528FFF" stroke="url(#grad2025)" stroke-width="8" stroke-linejoin="round" paint-order="stroke fill" letter-spacing="7.5px"`
  );
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Cards meta updated, gradient reversed, 2025 centered');
