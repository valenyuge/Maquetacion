const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(stylesPath, 'utf8');

// 1. Fix linear-gradient (Make it stronger so it definitely reaches black)
css = css.replace(
  /linear-gradient\(to bottom, rgba\(0,0,0,0\) 0%, rgba\(0,0,0,0\) 80%, #000000 100%\)/g,
  `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)`
);

// Remove border-radius on tarjeta-noticia just in case it's clipping the black
css = css.replace(
  /\.tarjeta-noticia \{\n  position: relative;\n  min-height: 100vh;\n  border-radius: 6px;/g,
  `.tarjeta-noticia {\n  position: relative;\n  min-height: 100vh;`
);

// 2. Move controls to the gap between sections
css = css.replace(
  /\.carrusel__controles-wrapper \{\n  position: absolute;\n  bottom: 1\.5rem;/g,
  `.carrusel__controles-wrapper {\n  position: absolute;\n  bottom: -32px; /* Centro exacto del gap de 64px entre secciones */`
);

fs.writeFileSync(stylesPath, css, 'utf8');
console.log('Moved controls and enhanced fade to black');
