const logout = require('../authentication/logout');

module.exports = store => ({
  label: 'Options',
  submenu: [
    { label: 'Logout', click() { logout(store); } },
  ],
});
