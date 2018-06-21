const { app } = require('electron'); // eslint-disable-line

module.exports = (store) => {
  store.clear();
  app.relaunch();
  app.exit();
};
