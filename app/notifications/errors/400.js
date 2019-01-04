const path = require('path');

const imagesDir = path.join(__dirname, '../images');

module.exports = {
  title: 'Bankbar',
  subtitle: 'Bad Request',
  body:
    'Log out re-enter your credentials. Double check them against the Monzo OAuth application',
  icon: `${imagesDir}/app-icon.png`
};
