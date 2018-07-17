const path = require('path');

const imagesDir = path.join(__dirname, '../images');

module.exports = {
  title: 'Bankbar',
  subtitle: 'Not Authenticated',
  body: 'Try logging out and back in if this persists',
  icon: `${imagesDir}/app-icon.png`,
};
