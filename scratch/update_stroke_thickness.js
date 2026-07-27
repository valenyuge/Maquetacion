const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Modify CAMPEONES stroke-width to 4
html = html.replace(
  /aria-label="CAMPEONES">[\s\S]*?<text([\s\S]*?)stroke-width="3"/,
  (match, p1) => {
    return `aria-label="CAMPEONES">\n    <defs>\n      <linearGradient id="gradCampeones" x1="0%" y1="0%" x2="100%" y2="0%">\n        <stop offset="3.79%" stop-color="#FFFFFF" />\n        <stop offset="108.7%" stop-color="#2C71FF" />\n      </linearGradient>\n    </defs>\n    <text${p1}stroke-width="4"`;
  }
);

// Alternative direct replace if the first one misses due to regex nuances
html = html.replace(
  /stroke="url\(#gradCampeones\)" stroke-width="3"/g,
  `stroke="url(#gradCampeones)" stroke-width="4"`
);

// Modify Sponsors stroke-width to 4
html = html.replace(
  /stroke="url\(#gradSponsors\)" stroke-width="3"/g,
  `stroke="url(#gradSponsors)" stroke-width="4"`
);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Stroke width updated to 4 for Campeones and Sponsors');
