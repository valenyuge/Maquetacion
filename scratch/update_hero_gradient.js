const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace the old hero background with the stacked gradients
const oldBackground = `background-image: linear-gradient(to right, #000000 0%, rgba(0,0,0,0) 100%), url('assets/portada.jpg');`;
const newBackground = `background-image: 
    linear-gradient(to bottom, #000000 0%, transparent 10%),
    linear-gradient(to top, #000000 0%, transparent 10%),
    linear-gradient(to right, #000000 0%, transparent 100%), 
    url('assets/portada.jpg');`;

css = css.replace(oldBackground, newBackground);

// If for some reason the exact old string wasn't matched due to spacing, use regex
if (!css.includes('linear-gradient(to bottom, #000000 0%, transparent 10%)')) {
    css = css.replace(
        /background-image:\s*linear-gradient\(to right, #000000 0%, rgba\(0,0,0,0\) 100%\),\s*url\('assets\/portada\.jpg'\);/g,
        newBackground
    );
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Hero gradient updated to include top and bottom fade');
