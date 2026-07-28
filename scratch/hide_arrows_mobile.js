const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Hide .carrusel__flecha on mobile
css = css.replace(
  /\.carrusel__flecha \{\n  position: absolute;\n  bottom: 0;\n  right: var\(--espacio-sm\);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: var\(--color-acento\);\n  color: #FFFFFF;\n  border: none;\n  display: flex;/g,
  `.carrusel__flecha {\n  position: absolute;\n  bottom: 0;\n  right: var(--espacio-sm);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: var(--color-acento);\n  color: #FFFFFF;\n  border: none;\n  display: none;`
);

// Show it on desktop
css = css.replace(
  /@media \(min-width: 1280px\) \{\n  \.carrusel__flecha \{\n    right: 70px;\n  \}\n\}/g,
  `@media (min-width: 1280px) {\n  .carrusel__flecha {\n    right: 70px;\n    display: flex;\n  }\n}`
);


// 2. Hide .carrusel-encuentros__flecha on mobile
css = css.replace(
  /\.carrusel-encuentros__flecha \{\n  position: absolute;\n  top: 50%;\n  right: var\(--espacio-sm\);\n  transform: translateY\(-50%\);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: var\(--color-acento\);\n  color: #FFFFFF;\n  border: none;\n  display: flex;/g,
  `.carrusel-encuentros__flecha {\n  position: absolute;\n  top: 50%;\n  right: var(--espacio-sm);\n  transform: translateY(-50%);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: var(--color-acento);\n  color: #FFFFFF;\n  border: none;\n  display: none;`
);

// Show it on desktop
css = css.replace(
  /@media \(min-width: 1280px\) \{\n  \.carrusel-encuentros__flecha \{\n    right: 70px;\n  \}\n\}/g,
  `@media (min-width: 1280px) {\n  .carrusel-encuentros__flecha {\n    right: 70px;\n    display: flex;\n  }\n}`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Mobile arrows hidden');
