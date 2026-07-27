const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(stylesPath, 'utf8');

// 1. Header to black
css = css.replace(
  /\.header \{\s*background-color: var\(--color-oscuro\);\s*color: #FFFFFF;\s*\}/,
  `.header {\n  background-color: #000000;\n  color: #FFFFFF;\n}`
);

// 2. Sponsors to black fade
css = css.replace(
  /\.sponsors \{\s*background: linear-gradient\(to bottom, var\(--color-oscuro\) 40%, rgba\(0, 0, 0, 0\.5\)\), url\('assets\/fondo-sponsors\.jpg'\) bottom \/ cover no-repeat;\s*\}/,
  `.sponsors {\n  background: linear-gradient(to bottom, #000000 40%, rgba(0, 0, 0, 0.5)), url('assets/fondo-sponsors.jpg') bottom / cover no-repeat;\n}`
);
css = css.replace(
  /\.sponsors \{\s*background: linear-gradient\(to bottom, var\(--color-oscuro\) 40%, rgba\(0, 0, 0, 0\.5\)\), url\('assets\/fondo-sponsors\.jpg'\) bottom \/ cover no-repeat;\s*\}\s*\.sponsors__titulo/,
  `.sponsors {\n  background: linear-gradient(to bottom, #000000 40%, rgba(0, 0, 0, 0.5)), url('assets/fondo-sponsors.jpg') bottom / cover no-repeat;\n}\n\n.sponsors__titulo`
);

// Fallback regex if it was split
css = css.replace(/var\(--color-oscuro\) 40%/g, '#000000 40%');

// 3. Button further down
css = css.replace(
  /\.carrusel__controles-wrapper \{\s*position: absolute;\s*bottom: -32px;/,
  `.carrusel__controles-wrapper {\n  position: absolute;\n  bottom: -60px; /* Mas abajo dentro del gap */`
);

// 4. Force override of .tarjeta-noticia fade to black
// Re-write the full block to be sure
const oldTarjetaRegex = /\.tarjeta-noticia \{\n  position: relative;\n  min-height: 100vh;\n  overflow: hidden;\n  background-image:\n    linear-gradient[\s\S]*?;\n  background-size: cover;\n  background-position: center;\n\}/;

const newTarjeta = `.tarjeta-noticia {\n  position: relative;\n  min-height: 100vh;\n  overflow: hidden;\n  background-image:\n    linear-gradient(to bottom, transparent 0%, transparent 60%, #000000 100%),\n    url('https://placehold.co/1200x600/0A1B2C/0A1B2C');\n  background-size: cover;\n  background-position: center;\n}`;

if (oldTarjetaRegex.test(css)) {
  css = css.replace(oldTarjetaRegex, newTarjeta);
} else {
  // If it didn't match the exact formatting, find the background-image directly
  css = css.replace(/background-image:\s*linear-gradient\([\s\S]*?url\('https:\/\/placehold\.co\/1200x600\/0A1B2C\/0A1B2C'\);/,
  `background-image:\n    linear-gradient(to bottom, transparent 0%, transparent 60%, #000000 100%),\n    url('https://placehold.co/1200x600/0A1B2C/0A1B2C');`);
}


fs.writeFileSync(stylesPath, css, 'utf8');
console.log('Fixed header, sponsors fade, button pos, and image fade.');
