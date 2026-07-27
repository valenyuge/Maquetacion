const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
const cssPath = path.join(__dirname, '../styles.css');

let html = fs.readFileSync(htmlPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Update .hero__titulo alignment in CSS
css = css.replace(
  /\.hero__titulo \{\n  line-height: 0.85;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n\}/g,
  `.hero__titulo {\n  line-height: 0.85;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  width: 100%;\n}`
);

// Catch the other instance of .hero__titulo just in case
css = css.replace(
  /\.hero__titulo \{\n  line-height: 0.95;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n\}/g,
  `.hero__titulo {\n  line-height: 0.95;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  width: 100%;\n}`
);

// 2. Rewrite CAMPEONES SVG to be left-aligned natively
html = html.replace(
  /<svg class="hero__titulo--outline"[\s\S]*?<\/svg>/,
  `<svg class="hero__titulo--outline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 180" style="width: 100%; max-width: 650px; height: auto; max-height: 180px; overflow: visible;" aria-label="CAMPEONES">
    <defs>
      <linearGradient id="gradCampeones" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="3.79%" stop-color="#FFFFFF" />
        <stop offset="108.7%" stop-color="#2C71FF" />
      </linearGradient>
    </defs>
    <text x="2" y="55%" dominant-baseline="middle" text-anchor="start" fill="none" stroke="url(#gradCampeones)" stroke-width="4" stroke-linejoin="round" style="font-family: 'Bebas Neue', sans-serif; font-size: 160px;">CAMPEONES</text>
  </svg>`
);

// 3. Rewrite 2025 SVG to be centered within the same 650px bounding box
html = html.replace(
  /<svg class="hero__titulo--solid"[\s\S]*?<\/svg>/,
  `<svg class="hero__titulo--solid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 350" style="width: 100%; max-width: 650px; height: auto; max-height: 350px; margin-top: -120px; z-index: 2; position: relative; overflow: visible;" aria-label="2025">
    <defs>
      <linearGradient id="grad2025" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#2C71FF" />
      </linearGradient>
    </defs>
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#528FFF" stroke="url(#grad2025)" stroke-width="8" stroke-linejoin="round" paint-order="stroke fill" letter-spacing="7.5px" style="font-family: 'Bebas Neue', sans-serif; font-size: 280px;">2025</text>
  </svg>`
);

fs.writeFileSync(htmlPath, html, 'utf8');
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Fixed hero SVG alignment and boxing');
