const { Menu } = require('electron'); // eslint-disable-line
const buildApp = require('../buildApp');
const getAccessToken = require('../serviceCalls/POST/accessToken');
const getAccount = require('../serviceCalls/GET/accounts');
const getAuthCode = require('./getAuthCode');
const server = require('./server');

const continueLogin = async (authorizationCode, store, svr, tray) => {
  console.log('in continueLogin');

  try {
    await svr.stop();
    const accessToken = await getAccessToken(authorizationCode);
    const accountId = await getAccount(accessToken.access_token);

    // save values for future use
    store.set('accessToken', accessToken.access_token);
    store.set('refreshToken', accessToken.refresh_token);
    store.set('accountId', accountId.accounts[0].id);
    store.set('sortCode', accountId.accounts[0].sort_code);
    store.set('accountNo', accountId.accounts[0].account_number);
    store.set('authorizationCode', authorizationCode);

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
    getAuthCode();
    server(continueLogin, store, tray);
  } catch (err) {
    console.log(`Error in startLogin: ${err}`);
  }
};

module.exports = (store, tray) => {
  console.log('in login');

  // clear store incase of errors
  store.clear();

  const loginMenu = Menu.buildFromTemplate([
    { label: 'Login', click() { startLogin(store, tray); } },
    { type: 'separator' },
    { label: 'Quit', role: 'quit' },
  ]);
  tray.setContextMenu(loginMenu);
};
