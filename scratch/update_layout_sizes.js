const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(stylesPath, 'utf8');

// 1. Modificar altura de la portada (hero) a 90vh
css = css.replace(
  /\.hero \{\n  display: flex;\n  align-items: center;\n  min-height: 100vh;\n  padding: var\(--espacio-md\) 0;\n\}/g,
  `.hero {\n  display: flex;\n  align-items: center;\n  min-height: 90vh;\n  padding: var(--espacio-md) 0;\n}`
);

// 2. Sacar el color azul a la imagen de fondo de la portada
css = css.replace(
  /\.hero \{\n  background-image: var\(--gradiente-fondo\), url\('assets\/portada\.jpg'\);\n  background-blend-mode: multiply;\n  background-size: cover;\n  background-position: center;\n\}/g,
  `.hero {\n  background-image: url('assets/portada.jpg');\n  background-size: cover;\n  background-position: center;\n}`
);

// 3. Sección sponsors ocupando 70vh y centrada
css = css.replace(
  /\.sponsors \{\n  display: grid;\n  gap: var\(--espacio-md\);\n  padding: var\(--espacio-lg\) var\(--espacio-sm\);\n\}/g,
  `.sponsors {\n  display: grid;\n  gap: var(--espacio-md);\n  padding: var(--espacio-lg) var(--espacio-sm);\n  min-height: 70vh;\n  align-content: center;\n}`
);

fs.writeFileSync(stylesPath, css, 'utf8');
console.log('Secciones ajustadas correctamente.');
