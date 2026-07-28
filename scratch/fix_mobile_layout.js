const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Fix Sponsors horizontal overflow (mobile layout wrap)
// In my previous script I appended this globally at the end:
// .sponsors__cabecera { display: flex; align-items: center; gap: 2rem; }
// .sponsors__titulo { flex: 0 0 auto; min-width: 450px; }
// .sponsors__texto { flex: 1 1 auto; margin-left: 2rem; }

css = css.replace(
  /\.sponsors__cabecera \{\n  display: flex;\n  align-items: center;\n  gap: 2rem;\n\}\n\.sponsors__titulo \{\n  flex: 0 0 auto;\n  min-width: 450px;\n\}\n\.sponsors__texto \{\n  flex: 1 1 auto;\n  margin-left: 2rem;\n\}/g,
  `/* Fixed Sponsors Desktop Layout to prevent mobile overflow */
@media (min-width: 1280px) {
  .sponsors__cabecera {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }
  .sponsors__titulo {
    flex: 0 0 auto;
    min-width: 450px;
  }
  .sponsors__texto {
    flex: 1 1 auto;
    margin-left: 2rem;
  }
}`
);

// 2. Fix Header mobile layout (keep on same line)
// Currently it is:
// .header__container { display: grid; grid-template-columns: 1fr; gap: var(--espacio-sm); ... }
css = css.replace(
  /\.header__container \{\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: var\(--espacio-sm\);\n  padding-top: var\(--espacio-sm\);\n  padding-bottom: var\(--espacio-sm\);\n\}/g,
  `.header__container {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding-top: var(--espacio-sm);\n  padding-bottom: var(--espacio-sm);\n}`
);

// We should also make sure .nav__lista is nowrap or tightly packed on mobile
// And shrink the nav__link font size on mobile to fit "Inicio Noticias Deportes Contacto" in 1 line
css = css.replace(
  /\.nav__lista \{\n  display: flex;\n  flex-wrap: wrap;\n\}/g,
  `.nav__lista {\n  display: flex;\n  flex-wrap: nowrap;\n  justify-content: flex-end;\n  overflow-x: auto;\n}`
);

// Since .nav__link has global font-size: 32px, it's way too big for a single line on mobile.
// We'll reset it to 16px on mobile, and 32px on desktop.
css = css.replace(
  /\.header__nombre, \.nav__link \{ font-size: 32px; \}/g,
  `.header__nombre { font-size: 32px; }
.nav__link { font-size: 16px; }
@media (min-width: 1280px) { .nav__link { font-size: 32px; } }`
);

// Also remove the padding left/right of nav items so they fit "mas junto"
css = css.replace(
  /\.nav__item \{\n  padding: 0 var\(--espacio-sm\);\n  border-right: 1px solid rgba\(217, 217, 217, 0\.4\); \/\* var\(--color-gris\) semitransparente \*\/\n\}/g,
  `.nav__item {\n  padding: 0 0.5rem;\n  border-right: 1px solid rgba(217, 217, 217, 0.4);\n}`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Mobile layout fixes applied (sponsors overflow, header alignment)');
