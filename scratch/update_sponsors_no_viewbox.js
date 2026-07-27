const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace the Sponsors SVG container with one that does NOT use viewBox, so it refuses to scale the font
html = html.replace(
  /<svg xmlns="http:\/\/www.w3.org\/2000\/svg" viewBox="0 0 350 120" style="width: 100%; max-width: 350px; height: auto; overflow: visible;" aria-label="Sponsors">/,
  `<svg xmlns="http://www.w3.org/2000/svg" style="width: 400px; height: 110px; overflow: visible;" aria-label="Sponsors">`
);

// Just in case the regex missed it due to formatting
if (!html.includes('style="width: 400px; height: 110px; overflow: visible;" aria-label="Sponsors"')) {
    html = html.replace(
      /<svg xmlns="http:\/\/www.w3.org\/2000\/svg"[^>]*aria-label="Sponsors">/,
      `<svg xmlns="http://www.w3.org/2000/svg" style="width: 400px; height: 110px; overflow: visible;" aria-label="Sponsors">`
    );
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Sponsors SVG viewBox removed to force strict 96px size');
