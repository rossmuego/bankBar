const { app } = require('electron');

module.exports = (store) => {
  store.clear();
  app.relaunch();
  app.exit();
};
