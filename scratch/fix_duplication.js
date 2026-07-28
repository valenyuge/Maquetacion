const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const endHtmlIndex = html.indexOf('</html>');
if (endHtmlIndex !== -1) {
  html = html.substring(0, endHtmlIndex + 7);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Truncated HTML to first </html>');
} else {
  console.log('Could not find </html>');
}
