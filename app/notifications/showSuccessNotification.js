const { Notification } = require('electron');

const login = require('./success/login');

module.exports = (options) => {
  const { notificationOptions } = options;
  if (options.type === 'login') {
    new Notification(login(notificationOptions)).show();
  }
};
