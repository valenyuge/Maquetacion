const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// The problematic block I added earlier:
// @media (min-width: 1280px) {
//   .header__container {
//     grid-template-columns: 1fr;
//     justify-content: center;
//   }
// }

// I will just replace it with the correct desktop layout
css = css.replace(
  /@media \(min-width: 1280px\) \{\n  \.header__container \{\n    grid-template-columns: 1fr;\n    justify-content: center;\n  \}\n\}/,
  `@media (min-width: 1280px) {
  .header__container {
    grid-template-columns: auto 1fr;
    justify-content: space-between;
  }
}`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Fixed desktop header layout');
