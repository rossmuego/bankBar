const { Menu } = require('electron'); // eslint-disable-line
const buildApp = require('../buildApp');
const config = require('../../config');
const getAccessToken = require('../serviceCalls/POST/accessToken');
const get = require('../serviceCalls/GET/get');
const getAuthCode = require('./getAuthCode');
const server = require('./server');

const continueLogin = async (store, svr, tray) => {
  console.log('in continueLogin');

  try {
    await svr.stop();

    const accessToken = await getAccessToken(store);
    store.set('accessToken', accessToken.access_token);
    store.set('refreshToken', accessToken.refresh_token);

    const accountId = await get(store, 'account');
    store.set('accountId', accountId.accounts[0].id);
    store.set('sortCode', accountId.accounts[0].sort_code);
    store.set('accountNo', accountId.accounts[0].account_number);

    console.log('user setup!');

    // start to build app
    buildApp(store, tray);
  } catch (err) {
    console.log(`Error in continueLogin: ${err}`);
  }
};

// due to server, login split into two parts
// todo: can they be merged?
const startLogin = async (store, tray) => {
  console.log('in startLogin');

  try {
    getAuthCode(store);
    server(continueLogin, store, tray);
  } catch (err) {
    console.log(`Error in startLogin: ${err}`);
  }
};

module.exports = (store, tray) => {
  console.log('in login');

  // clear store incase of errors
  store.clear();

  const {
    CLIENT_ID: clientId,
    CLIENT_SECRET: clientSecret,
    REDIRECT_URI: redirectUri,
  } = config;

  store.set('clientId', clientId);
  store.set('clientSecret', clientSecret);
  store.set('redirectUri', redirectUri);

  const loginMenu = Menu.buildFromTemplate([
    { label: 'Login', click() { startLogin(store, tray); } },
    { type: 'separator' },
    { label: 'Quit', role: 'quit' },
  ]);
  tray.setContextMenu(loginMenu);
};
