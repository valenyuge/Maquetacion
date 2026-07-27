const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
const cssPath = path.join(__dirname, '../styles.css');

let html = fs.readFileSync(htmlPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Reemplazar CAMPEONES y 2025 con SVG
html = html.replace(
  /<h1 class="hero__titulo" id="hero-titulo">[\s\S]*?<\/h1>/,
  `<h1 class="hero__titulo" id="hero-titulo">
  <svg class="hero__titulo--outline" style="overflow: visible; width: 100%; height: 1em;" aria-label="CAMPEONES">
    <defs>
      <linearGradient id="gradCampeones" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="3.79%" stop-color="#FFFFFF" />
        <stop offset="108.7%" stop-color="#2C71FF" />
      </linearGradient>
    </defs>
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="none" stroke="url(#gradCampeones)" stroke-width="2" style="font-family: 'Bebas Neue', sans-serif;">CAMPEONES</text>
  </svg>
  <svg class="hero__titulo--solid" style="overflow: visible; width: 100%; height: 1em; margin-top: -0.15em; z-index: 2; position: relative;" aria-label="2025">
    <defs>
      <linearGradient id="grad2025" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#2C71FF" />
      </linearGradient>
    </defs>
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#528FFF" stroke="url(#grad2025)" stroke-width="3" style="font-family: 'Bebas Neue', sans-serif;">2025</text>
  </svg>
</h1>`
);

// 2. Reemplazar Sponsors con SVG
html = html.replace(
  /<h2 class="sponsors__titulo">Sponsors<\/h2>/,
  `<h2 class="sponsors__titulo" style="line-height: 1; margin-bottom: -15px;">
  <svg style="overflow: visible; width: 100%; height: 1em;" aria-label="Sponsors">
    <defs>
      <linearGradient id="gradSponsors" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="3.79%" stop-color="#FFFFFF" />
        <stop offset="108.7%" stop-color="#2C71FF" />
      </linearGradient>
    </defs>
    <text x="0" y="55%" dominant-baseline="middle" text-anchor="start" fill="none" stroke="url(#gradSponsors)" stroke-width="2" style="font-family: 'Bebas Neue', sans-serif;">Sponsors</text>
  </svg>
</h2>`
);

// 3. Limpiar CSS de webkit-text-stroke para que no ensucie
css = css.replace(/-webkit-text-stroke: 1px #2C71FF;/g, '');
css = css.replace(/-webkit-text-stroke: 1px #FFFFFF;/g, '');

fs.writeFileSync(htmlPath, html, 'utf8');
fs.writeFileSync(cssPath, css, 'utf8');
console.log('SVG text implemented for gradient strokes');
