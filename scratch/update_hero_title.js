const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.css');
const htmlPath = path.join(__dirname, '../index.html');

let css = fs.readFileSync(stylesPath, 'utf8');
let html = fs.readFileSync(htmlPath, 'utf8');

// Update .hero__titulo for overlap and centering
css = css.replace(
  /\.hero__titulo \{\n  font-size: 3\.5rem;\n  line-height: 0\.95;\n\}/g,
  `.hero__titulo {\n  font-size: 3.5rem;\n  line-height: 0.95;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: fit-content;\n}`
);

css = css.replace(
  /\.hero__titulo \{\s*font-size:\s*164px;\s*line-height:\s*0\.85;\s*\}/g,
  `.hero__titulo {\n  font-size: 164px;\n  line-height: 0.85;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: fit-content;\n}`
);

css = css.replace(
  /\.hero__titulo--solid \{\n  color: #528FFF;\n  -webkit-text-stroke: 1px #FFFFFF;\n\}/g,
  `.hero__titulo--solid {\n  color: #528FFF;\n  -webkit-text-stroke: 1px #FFFFFF;\n  margin-top: -0.35em;\n  position: relative;\n  z-index: 2;\n}`
);

html = html.replace(
  /<span class="hero__titulo--outline">CAMPEONES<\/span><br>/g,
  `<span class="hero__titulo--outline">CAMPEONES</span>`
);

fs.writeFileSync(stylesPath, css, 'utf8');
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Hero title overlapping and inline styles fixed');
