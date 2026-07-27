const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace max-width: 500px with a wider or removed constraint so it doesn't scale down the 96px text
html = html.replace(
  /<h2 class="sponsors__titulo" style="line-height: 1; margin-bottom: -15px; width: 100%; max-width: 500px;">/g,
  `<h2 class="sponsors__titulo" style="line-height: 1; margin-bottom: -15px;">`
);

// We should also adjust the SVG width so it doesn't try to be 100% of a huge container (which would make it massive)
// Instead of width: 100%, let's use width: 350px (approx size of 'Sponsors' in 96px Bebas Neue) or max-width: 100%
html = html.replace(
  /<svg xmlns="http:\/\/www.w3.org\/2000\/svg" viewBox="0 0 600 120" style="width: 100%; height: auto; overflow: visible;" aria-label="Sponsors">/g,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 120" style="width: 100%; max-width: 350px; height: auto; overflow: visible;" aria-label="Sponsors">`
);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Sponsors SVG scaling fixed');
