const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'Infuse.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find the mocktails section block
const mocktailsStart = content.indexOf('{/* Mocktails Section */}');
const infoBannerStart = content.indexOf('{/* Info Banner Footer */}');

// Find the bakery section block
const bakeryStart = content.indexOf('{/* Bakery Section */}');
const footerStart = content.indexOf('{/* Footer */}');

if (mocktailsStart !== -1 && infoBannerStart !== -1 && bakeryStart !== -1 && footerStart !== -1) {
  const bakerySection = content.substring(bakeryStart, footerStart);
  
  // Replace mocktails with bakery
  const beforeMocktails = content.substring(0, mocktailsStart);
  const betweenMocktailsAndBakery = content.substring(infoBannerStart, bakeryStart);
  const afterBakery = content.substring(footerStart);

  const newContent = beforeMocktails + bakerySection + betweenMocktailsAndBakery + afterBakery;
  fs.writeFileSync(filePath, newContent);
  console.log("Successfully reordered sections in Infuse.jsx");
} else {
  console.log("Error finding sections:", {
    mocktails: mocktailsStart !== -1,
    info: infoBannerStart !== -1,
    bakery: bakeryStart !== -1,
    footer: footerStart !== -1
  });
}
