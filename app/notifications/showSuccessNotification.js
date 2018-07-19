const { Notification } = require('electron'); // eslint-disable-line

const login = require('./success/login');

module.exports = (options) => {
  if (options.type === 'login') {
    const { notificationOptions } = options;
    const { name } = notificationOptions;
    new Notification(login(name)).show();
  }
};
