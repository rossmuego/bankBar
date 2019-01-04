const path = require('path');

const imagesDir = path.join(__dirname, '../images');

module.exports = {
  title: 'Bankbar',
  subtitle: 'Monzo Error',
  body: "Oops. Hopefully they're not down too long",
  icon: `${imagesDir}/app-icon.png`
};
