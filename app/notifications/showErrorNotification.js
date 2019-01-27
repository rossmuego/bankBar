const { Notification } = require('electron');

const badRequest = require('./errors/400');
const notAuthenticated = require('./errors/401');
const serverError = require('./errors/500');
const general = require('./errors/general');
const noInternet = require('./errors/noInternet');

module.exports = (err) => {
  if (err.code === 'ENOTFOUND') {
    new Notification(noInternet).show();
  } else if (err.status === 400) {
    new Notification(badRequest).show();
  } else if (err.status === 401) {
    new Notification(notAuthenticated).show();
  } else if (err.status === 500) {
    new Notification(serverError).show();
  } else {
    new Notification(general).show();
  }
};
