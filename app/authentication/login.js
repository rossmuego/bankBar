const { app } = require('electron'); // eslint-disable-line
const debug = require('debug')('login');
const buildApp = require('../buildApp');
const get = require('../serviceCalls/get');
const getAuthCode = require('./getAuthCode');
const oAuthWindow = require('../windows/OAuth/OAuthWindow');
const setAccessToken = require('../serviceCalls/POST/accessToken');

const continueLogin = async (store, tray) => {
  debug('in continueLogin');

  try {
    await setAccessToken(store);
    const accountId = await get(store, 'account');

    store.set('accountId', accountId.accounts[0].id);
    store.set('sortCode', accountId.accounts[0].sort_code);
    store.set('accountNo', accountId.accounts[0].account_number);

    debug('user setup!');

    buildApp(store, tray);
  } catch (err) {
    debug(`Error in continueLogin: ${err}`);
  }
};

module.exports = (store, tray) => {
  try {
    if (
      store.has('clientId') &&
      store.has('clientSecret')
    ) {
      store.set('redirectUri', 'bankbar://redirect-uri/');
      getAuthCode(store);

      app.on('open-url', (event, url) => {
        event.preventDefault();
        const authorizationCode = url
          .split('bankbar://redirect-uri/?code=')[1]
          .split('&state=')[0];
        debug(authorizationCode);

        store.set('authorizationCode', authorizationCode);
        continueLogin(store, tray);
      });
    } else {
      oAuthWindow(store);
    }
  } catch (err) {
    debug('couldnt start login');
  }
};

