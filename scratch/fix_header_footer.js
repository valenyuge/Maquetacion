const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
const indexPath = path.join(__dirname, '../index.html');

let css = fs.readFileSync(stylesPath, 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

// Fix header__container padding overriding horizontal padding
css = css.replace(
  /\.header__container \{\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: var\(--espacio-sm\);\n  padding: var\(--espacio-sm\) 0;\n\}/g,
  `.header__container {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: var(--espacio-sm);\n  padding-top: var(--espacio-sm);\n  padding-bottom: var(--espacio-sm);\n}`
);

css = css.replace(
  /\.header__container \{\n    grid-template-columns: auto 1fr;\n    align-items: center;\n    justify-content: space-between;\n    padding: var\(--espacio-sm\) 0;\n  \}/g,
  `.header__container {\n    grid-template-columns: auto 1fr;\n    align-items: center;\n    justify-content: space-between;\n    padding-top: var(--espacio-sm);\n    padding-bottom: var(--espacio-sm);\n  }`
);

// Fix sponsors logo
css = css.replace(
  /\.sponsors__logo \{\s*max-width: 120px;\s*filter: grayscale\(100%\) brightness\(0\) invert\(1\);\s*opacity: 0\.7;\s*transition: opacity 0\.2s ease, filter 0\.2s ease;\s*\}/,
  `.sponsors__logo {\n  max-width: 120px;\n  transition: transform 0.3s ease;\n}`
);

css = css.replace(
  /\.sponsors__logo:hover \{\s*filter: none;\s*opacity: 1;\s*\}/,
  `.sponsors__logo:hover {\n  transform: scale(1.1);\n}`
);

// Fix footer__grid and footer__bottom horizontal padding conflicts
css = css.replace(
  /\.footer__grid \{\s*display: grid;\s*grid-template-columns: 1fr; \/\* mobile: 1 columna \*\/\s*gap: 80px; \/\* medida estricta pedida por el diseño \*\/\s*padding: 0 var\(--espacio-sm\);\s*\}/,
  `.footer__grid {\n  display: grid;\n  grid-template-columns: 1fr; /* mobile: 1 columna */\n  gap: 80px; /* medida estricta pedida por el diseño */\n}`
);

css = css.replace(
  /\.footer__bottom \{\s*grid-column: 1 \/ -1;\s*border-top: 1px solid rgba\(255, 255, 255, 0\.1\);\s*padding-top: 2rem;\s*margin-top: 2rem;\s*padding-left: var\(--espacio-sm\);\s*padding-right: var\(--espacio-sm\);\s*text-align: center;\s*\}/,
  `.footer__bottom {\n  grid-column: 1 / -1;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  padding-top: 2rem;\n  margin-top: 2rem;\n  text-align: center;\n}`
);

fs.writeFileSync(stylesPath, css, 'utf8');

// Fix HTML to add container to footer__grid and footer__bottom
html = html.replace(
  /<div class="footer__grid">/g,
  `<div class="container footer__grid">`
);

html = html.replace(
  /<div class="footer__bottom">/g,
  `<div class="container footer__bottom">`
);

fs.writeFileSync(indexPath, html, 'utf8');

console.log('Fixed header/footer margins and sponsor logos');
