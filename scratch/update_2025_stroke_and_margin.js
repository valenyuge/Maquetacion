const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Update 2025 stroke-width from 4 to 8
html = html.replace(
  /aria-label="2025">[\s\S]*?<text([\s\S]*?)stroke-width="4"/,
  (match, p1) => {
    // This regex ensures we only target the 2025 SVG
    return match.replace('stroke-width="4"', 'stroke-width="8"');
  }
);

// Fallback direct replace if the first one fails
if (!html.includes('stroke-width="8"')) {
    html = html.replace(
      /stroke="url\(#grad2025\)" stroke-width="4"/g,
      `stroke="url(#grad2025)" stroke-width="8"`
    );
}

// Update inline margin-top from -80px to -45px (-0.15em of 304px)
html = html.replace(
  /margin-top:\s*-80px;/g,
  `margin-top: -45px;`
);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('2025 stroke doubled and margin fixed');
