const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const overrides = `
/* =========================================================================
   FINAL TWEAKS (Sponsors SVG, Header alignment, Arrows, Touch Swipe, Gap)
   ========================================================================= */

/* 1. Sponsors SVG Size on Mobile */
@media (max-width: 768px) {
  .sponsors__cabecera svg {
    max-height: 80px !important;
  }
}

/* 2. Hide arrows on mobile */
@media (max-width: 768px) {
  .carrusel__flecha, .carrusel-encuentros__flecha {
    display: none !important;
  }
}

/* 3. Space between Proximos Encuentros and carousel */
.encuentros {
  gap: var(--espacio-lg) !important;
}

/* 4. Fix Header Crookedness */
.nav__lista {
  margin: 0 !important;
  padding: 0 !important;
  align-items: center;
}
.header__marca {
  margin: 0 !important;
}

/* 5. Ensure Touch Swipe Works */
.novedades__carrusel {
  -webkit-overflow-scrolling: touch !important;
  touch-action: pan-x pan-y !important;
}

/* Fix pointers for controls since wrapper has pointer-events: none */
.carrusel__indicadores, .carrusel__flecha {
  pointer-events: auto !important;
}
`;

if (!css.includes('FINAL TWEAKS')) {
  css += overrides;
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Final tweaks applied successfully');
} else {
  console.log('Final tweaks already applied');
}
