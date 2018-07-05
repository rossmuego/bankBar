const { Menu, app } = require('electron'); // eslint-disable-line
const buildApp = require('../buildApp');
const logout = require('./logout');
const getAccessToken = require('../serviceCalls/POST/accessToken');
const get = require('../serviceCalls/get');
const getAuthCode = require('./getAuthCode');
const debug = require('debug')('login');

const continueLogin = async (store, tray) => {
  debug('in continueLogin');

  try {
    const accessToken = await getAccessToken(store);
    store.set('accessToken', accessToken.access_token);
    store.set('refreshToken', accessToken.refresh_token);

    const accountId = await get(store, 'account');
    store.set('accountId', accountId.accounts[0].id);
    store.set('sortCode', accountId.accounts[0].sort_code);
    store.set('accountNo', accountId.accounts[0].account_number);

    debug('user setup!');

    // start to build app
    buildApp(store, tray);
  } catch (err) {
    debug(`Error in continueLogin: ${err}`);
  }
};

module.exports = (store, tray) => {
  debug('logging in');

  store.set('redirectUri', 'bankbar://redirect-uri/');

  try {
    const loginMenu = Menu.buildFromTemplate([
      { label: 'Restart', click() { logout(store); } },
      { label: 'Quit', role: 'quit' },
    ]);
    tray.setContextMenu(loginMenu);

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
  } catch (err) {
    debug('couldnt start login');
  }
};

