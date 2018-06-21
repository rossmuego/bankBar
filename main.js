require('dotenv').config();

const { app, Tray } = require('electron'); // eslint-disable-line
const login = require('./app/authentication/login');
const path = require('path');
const Store = require('electron-store');
const checkAuth = require('./app/authentication/checkAuth');
const oAuthWindow = require('./app/windows/OAuth/OAuthWindow');
const buildApp = require('./app/buildApp');

const debug = require('debug')('main');

const imagesDir = path.join(__dirname, '/app/images');

const store = new Store();

if (process.platform === 'darwin') {
  app.dock.hide();
}

app.on('ready', async () => {
  debug('starting bankbar...');
  if (process.env.CLEAR_STORE === 'true') {
    store.clear();
    debug('store cleared');
  }

  try {
    const tray = new Tray(`${imagesDir}/icon.png`);
    debug(store.get());

    if (store.has('clientId') && store.has('clientSecret')) {
      if (store.has('accessToken') && store.has('refreshToken')) {
        await checkAuth(store, tray);
        await buildApp(store, tray);
      } else {
        debug('no accessToken or RefreshToken');
        login(store, tray);
      }
    } else {
      oAuthWindow(store);
    }
  } catch (err) {
    debug(`Error starting app: ${err}`);
  }
});
