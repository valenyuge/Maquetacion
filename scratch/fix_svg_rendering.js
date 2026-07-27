const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Rewrite Hero Title SVGs perfectly
html = html.replace(
  /<h1 class="hero__titulo" id="hero-titulo">[\s\S]*?<\/h1>/,
  `<h1 class="hero__titulo" id="hero-titulo">
  <svg class="hero__titulo--outline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 200" style="width: 100%; height: auto; max-height: 200px; overflow: visible;" aria-label="CAMPEONES">
    <defs>
      <linearGradient id="gradCampeones" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="3.79%" stop-color="#FFFFFF" />
        <stop offset="108.7%" stop-color="#2C71FF" />
      </linearGradient>
    </defs>
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="none" stroke="url(#gradCampeones)" stroke-width="3" stroke-linejoin="round" style="font-family: 'Bebas Neue', sans-serif; font-size: 160px;">CAMPEONES</text>
  </svg>
  <svg class="hero__titulo--solid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 350" style="width: 100%; height: auto; max-height: 350px; margin-top: -80px; z-index: 2; position: relative; overflow: visible;" aria-label="2025">
    <defs>
      <linearGradient id="grad2025" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#2C71FF" />
      </linearGradient>
    </defs>
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#528FFF" stroke="url(#grad2025)" stroke-width="4" stroke-linejoin="round" paint-order="stroke fill" style="font-family: 'Bebas Neue', sans-serif; font-size: 304px;">2025</text>
  </svg>
</h1>`
);

// 2. Rewrite Sponsors safely and fix clipping
html = html.replace(
  /<h2 class="sponsors__titulo"[\s\S]*?<\/h2>/,
  `<h2 class="sponsors__titulo" style="line-height: 1; margin-bottom: -15px; width: 100%; max-width: 500px;">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 120" style="width: 100%; height: auto; overflow: visible;" aria-label="Sponsors">
    <defs>
      <linearGradient id="gradSponsors" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="3.79%" stop-color="#FFFFFF" />
        <stop offset="108.7%" stop-color="#2C71FF" />
      </linearGradient>
    </defs>
    <text x="2" y="55%" dominant-baseline="middle" text-anchor="start" fill="none" stroke="url(#gradSponsors)" stroke-width="3" stroke-linejoin="round" style="font-family: 'Bebas Neue', sans-serif; font-size: 96px;">Sponsors</text>
  </svg>
</h2>`
);

// If for some reason the previous regex missed sponsors because it was malformed:
if (!html.includes('<linearGradient id="gradSponsors"')) {
    html = html.replace(
      /<div class="sponsors__cabecera">[\s\S]*?<p class="sponsors__texto">/,
      `<div class="sponsors__cabecera">\n  <h2 class="sponsors__titulo" style="line-height: 1; margin-bottom: -15px; width: 100%; max-width: 500px;">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 120" style="width: 100%; height: auto; overflow: visible;" aria-label="Sponsors">
    <defs>
      <linearGradient id="gradSponsors" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="3.79%" stop-color="#FFFFFF" />
        <stop offset="108.7%" stop-color="#2C71FF" />
      </linearGradient>
    </defs>
    <text x="2" y="55%" dominant-baseline="middle" text-anchor="start" fill="none" stroke="url(#gradSponsors)" stroke-width="3" stroke-linejoin="round" style="font-family: 'Bebas Neue', sans-serif; font-size: 96px;">Sponsors</text>
  </svg>
</h2>\n  <p class="sponsors__texto">`
    );
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Fixed SVG rendering artifacts');
