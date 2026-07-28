const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// The problematic nested block in styles.css:
//   .header__nombre { font-size: 32px; display: none; }
// @media (min-width: 1280px) { .header__nombre { display: block; } }
// .nav__link { font-size: 16px; }
// @media (min-width: 1280px) { .nav__link { font-size: 32px; } }

// Replace this chunk with a clean version inside the 1280px block,
// and prepend the mobile-first logic BEFORE the 1280px block.

css = css.replace(
  /\.header__nombre \{ font-size: 32px; display: none; \}\n@media \(min-width: 1280px\) \{ \.header__nombre \{ display: block; \} \}\n\.nav__link \{ font-size: 16px; \}\n@media \(min-width: 1280px\) \{ \.nav__link \{ font-size: 32px; \} \}/,
  `.header__nombre { font-size: 32px; }
  .nav__link { font-size: 32px; }`
);

// Now append the correct global (mobile-first) rules to the very end of the file
css += `
/* Responsive tweaks */
/* Only hide logo text on screens 420px or smaller */
@media (max-width: 420px) {
  .header__nombre {
    display: none;
  }
}
/* Reduce nav link font size on mobile up to desktop */
.nav__link {
  font-size: 16px;
}
@media (min-width: 1280px) {
  .nav__link {
    font-size: 32px;
  }
}
`;

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Fixed header__nombre display logic for max-width 420px');
