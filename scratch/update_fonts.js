const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(stylesPath, 'utf8');

const desktopFontsCSS = `
  /* TAMAÑOS DE TEXTO DESKTOP (Figma) */
  .header__nombre, .nav__link { font-size: 32px; }
  
  .hero__categoria { font-size: 16px; }
  .hero__titulo { font-size: 164px; line-height: 0.85; }
  .hero__bajada { font-size: 20px; }
  .hero__cta { font-size: 14px; }
  
  .encuentros__titulo, .novedades__titulo { font-size: 96px; }
  .tarjeta-evento__titulo { font-size: 40px; }
  .tarjeta-evento__categoria { font-size: 16px; }
  .tarjeta-evento__meta-item { font-size: 12px; }
  
  .tarjeta-noticia__titulo { font-size: 64px; }
  .tarjeta-noticia__resumen { font-size: 24px; }
  .tarjeta-noticia__cta { font-size: 14px; }
  
  .sponsors__titulo { font-size: 96px; }
  .sponsors__texto { font-size: 16px; }
  
  .footer__texto, .footer__link, .footer__copyright { font-size: 14px; }
`;

// Insert the new font sizes into the @media (min-width: 1280px) block
// We can find the closing brace of the media query or just append a new media query for fonts
const newMediaQuery = `
/* ==============================================================
   7. TAMAÑOS DE TEXTO ESTRICTOS (Desktop)
   ============================================================== */
@media (min-width: 1280px) {
${desktopFontsCSS}
}
`;

css += newMediaQuery;

fs.writeFileSync(stylesPath, css, 'utf8');

console.log('Fonts updated successfully.');
