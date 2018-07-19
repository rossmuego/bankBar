const path = require('path');

const imagesDir = path.join(__dirname, '../images');

module.exports = name => ({
  title: 'Bankbar',
  subtitle: `Congratulations ${name}`,
  body: 'You can successfully authenticated with Monzo',
  icon: `${imagesDir}/app-icon.png`,
});
