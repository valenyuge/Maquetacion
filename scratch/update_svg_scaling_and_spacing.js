const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Decrease letter-spacing for 2025 to half
html = html.replace(
  /letter-spacing="15px"/g,
  `letter-spacing="7.5px"`
);

// 2. Force a significantly larger font-size inside the SVG for Sponsors to combat render discrepancies
html = html.replace(
  /font-size: 96px;">Sponsors<\/text>/g,
  `font-size: 144px;">Sponsors</text>`
);

// 3. Ensure the SVG container is large enough to not clip the boosted font size
html = html.replace(
  /style="width: 400px; height: 110px; overflow: visible;" aria-label="Sponsors"/g,
  `style="width: 100%; max-width: 600px; height: 160px; overflow: visible;" aria-label="Sponsors"`
);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Fixed 2025 spacing and boosted Sponsors SVG font size');
