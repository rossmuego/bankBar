const { app } = require('electron'); // eslint-disable-line
const debug = require('debug')('login');
const buildApp = require('../buildApp');
const get = require('../serviceCalls/get');
const getAuthCode = require('./getAuthCode');
const oAuthWindow = require('../windows/OAuth/OAuthWindow');
const setAccessToken = require('../serviceCalls/POST/accessToken');
const showNotification = require('../notifications/showSuccessNotification');
const showErrorNotification = require('../notifications/showErrorNotification');

const continueLogin = async (store, tray) => {
  debug('Continuing login');

  try {
    await setAccessToken(store);
    const accountId = await get(store, 'account');

    store.set(
      'firstName',
      accountId.accounts[0].owners[0].preferred_first_name
    );
    store.set('accountId', accountId.accounts[0].id);
    store.set('sortCode', accountId.accounts[0].sort_code);
    store.set('accountNo', accountId.accounts[0].account_number);

    const notificationOptions = {
      name: store.get('firstName')
    };

    showNotification({ type: 'login', notificationOptions });
    buildApp(store, tray);
  } catch (err) {
    showErrorNotification(err);
    debug('Error: ', err);
  }
};

module.exports = (store, tray) => {
  debug('Logging in');

  try {
    if (store.has('clientId') && store.has('clientSecret')) {
      store.set('redirectUri', 'https://johneas.io/bankbar/auth/');
      getAuthCode(store);

      app.on('open-url', (event, url) => {
        event.preventDefault();
        const authorizationCode = url.split('bankbar://')[1];

        store.set('authorizationCode', authorizationCode);
        continueLogin(store, tray);
      });
    } else {
      oAuthWindow(store);
    }
  } catch (err) {
    showErrorNotification(err);
    debug('Error: ', err);
  }
};
