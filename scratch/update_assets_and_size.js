const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
const cssPath = path.join(__dirname, '../styles.css');

let html = fs.readFileSync(htmlPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Fix image paths (imagenes/ -> assets/)
html = html.replace(/src="imagenes\/lugar\.png"/g, 'src="assets/lugar.png"');
html = html.replace(/src="imagenes\/hora\.png"/g, 'src="assets/hora.png"');
html = html.replace(/src="imagenes\/calendario\.png"/g, 'src="assets/calendario.png"');

// 2. Restore 2025 to 224px and fix overlap margin back to -120px
html = html.replace(/font-size: 176px;/g, 'font-size: 224px;');
html = html.replace(/margin-top: -145px;/g, 'margin-top: -120px;');

css = css.replace(/font-size: 176px;/g, 'font-size: 224px;');

fs.writeFileSync(htmlPath, html, 'utf8');
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Fixed image paths and restored 2025 size');
