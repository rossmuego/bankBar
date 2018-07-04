const restart = require('../utils/restart');

module.exports = store => ({
  label: 'Options',
  submenu: [
    { label: 'Logout', click() { restart(store); } },
  ],
});
