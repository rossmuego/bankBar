const { Menu } = require('electron'); // eslint-disable-line
const buildApp = require('../buildApp');
const restart = require('../utils/restart');
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

  try {
    debug('setting env values');

    store.set('redirectUri', 'http://127.0.0.1:3456/');
  } catch (err) {
    debug('couldnt set env values');
  }

  const loginMenu = Menu.buildFromTemplate([
    { label: 'Restart', click() { restart(store); } },
  ]);
  tray.setContextMenu(loginMenu);

  startLogin(store, tray);
};

