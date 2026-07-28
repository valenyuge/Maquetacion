const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
const cssPath = path.join(__dirname, '../styles.css');

let html = fs.readFileSync(htmlPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');

// --- INDEX.HTML FIXES ---

// 1. Remove inline margin-top: -150px from 2025 to let CSS handle it
html = html.replace(/margin-top:\s*-150px;/g, '');

// 2. Fix Sponsors SVG scaling
html = html.replace(
  /<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" style="width: 100%; max-width: 600px; height: 160px; overflow: visible;" aria-label="Sponsors">/g,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550 160" style="width: 100%; max-width: 550px; height: auto; max-height: 160px; overflow: visible;" aria-label="Sponsors">`
);

fs.writeFileSync(htmlPath, html, 'utf8');

// --- STYLES.CSS FIXES ---

// Append all mobile fixes to the very end of styles.css to ensure they override safely

const overrides = `
/* =========================================================================
   RESTORED MOBILE FIXES (from Jul 27)
   ========================================================================= */

/* 1. Header Sticky */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
}
@media (min-width: 1280px) {
  .header {
    position: relative;
  }
}

/* 2. Hide logo text on small mobiles */
@media (max-width: 420px) {
  .header__nombre {
    display: none !important;
  }
}

/* 3. Header layout on mobile */
.header__container {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
@media (min-width: 1280px) {
  .header__container {
    grid-template-columns: 1fr;
    justify-content: center;
  }
}

/* 4. Nav layout */
.nav__lista {
  flex-wrap: nowrap;
  justify-content: flex-end;
  overflow-x: auto;
}
.nav__link {
  font-size: 16px !important;
}
.nav__item {
  padding: 0 0.5rem;
}
@media (min-width: 1280px) {
  .nav__lista {
    flex-wrap: wrap;
    justify-content: center;
    overflow-x: visible;
  }
  .nav__link {
    font-size: 32px !important;
  }
  .nav__item {
    padding: 0 var(--espacio-sm);
  }
}

/* 5. Hero 2025 Overlap */
.hero__titulo--solid {
  margin-top: -10% !important;
}
@media (min-width: 1280px) {
  .hero__titulo--solid {
    margin-top: -150px !important;
  }
}

/* 6. Sponsors Desktop/Mobile Flex Direction */
@media (max-width: 1279px) {
  .sponsors__cabecera {
    flex-direction: column;
    align-items: flex-start;
  }
  .sponsors__titulo {
    min-width: 0 !important;
  }
}
`;

if (!css.includes('RESTORED MOBILE FIXES')) {
  css += overrides;
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Mobile fixes restored successfully');
} else {
  console.log('Mobile fixes already restored');
}
