const { Menu } = require('electron'); // eslint-disable-line
const buildApp = require('../buildApp');
const config = require('../../config');
const getAccessToken = require('../serviceCalls/POST/accessToken');
const get = require('../serviceCalls/get');
const getAuthCode = require('./getAuthCode');
const server = require('./server');
const debug = require('debug')('login');

const continueLogin = async (store, svr, tray) => {
  debug('in continueLogin');

  try {
    await svr.stop();
    debug('server stopped');
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

// due to server, login split into two parts
// todo: can they be merged?
const startLogin = async (store, tray) => {
  debug('login clicked');

  try {
    getAuthCode(store);
    server(continueLogin, store, tray);
  } catch (err) {
    debug(`Error in startLogin: ${err}`);
  }
};

module.exports = (store, tray) => {
  debug('logging in');

  // clear store incase of errors
  store.clear();

  try {
    debug('setting env values');
    const {
      CLIENT_ID: clientId,
      CLIENT_SECRET: clientSecret,
      REDIRECT_URI: redirectUri,
    } = config;

    store.set('clientId', clientId);
    store.set('clientSecret', clientSecret);
    store.set('redirectUri', redirectUri);
  } catch (err) {
    debug('couldnt set env values');
  }

  const loginMenu = Menu.buildFromTemplate([
    { label: 'Login', click() { startLogin(store, tray); } },
    { type: 'separator' },
    { label: 'Quit', role: 'quit' },
  ]);
  tray.setContextMenu(loginMenu);
  debug('waiting for user to click login');
};
