const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
const cssPath = path.join(__dirname, '../styles.css');

let html = fs.readFileSync(htmlPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Hide .header__nombre on mobile
css = css.replace(
  /\.header__nombre \{ font-size: 32px; \}/g,
  `.header__nombre { font-size: 32px; display: none; }\n@media (min-width: 1280px) { .header__nombre { display: block; } }`
);

// 2. Fix 2025 overlap on mobile by removing inline margin-top and moving it to CSS
html = html.replace(/margin-top:\s*-150px;/g, '');
css += `\n/* Fix 2025 overlap for mobile */\n.hero__titulo--solid { margin-top: -10%; }\n@media (min-width: 1280px) { .hero__titulo--solid { margin-top: -150px; } }\n`;

// 3. Fix Sponsors SVG scaling by adding a viewBox and setting height to auto
html = html.replace(
  /<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" style="width: 100%; max-width: 600px; height: 160px; overflow: visible;" aria-label="Sponsors">/g,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550 160" style="width: 100%; max-width: 550px; height: auto; max-height: 160px; overflow: visible;" aria-label="Sponsors">`
);

fs.writeFileSync(htmlPath, html, 'utf8');
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Mobile sizing fixes applied');
