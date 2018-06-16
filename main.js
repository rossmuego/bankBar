const { app, Tray } = require('electron'); // eslint-disable-line
const buildApp = require('./app/buildApp');
const get = require('./app/serviceCalls/get');
const login = require('./app/authentication/login');
const getRefreshToken = require('./app/serviceCalls/POST/refreshToken');
const path = require('path');
const Store = require('electron-store');
const debug = require('debug')('main');

const imagesDir = path.join(__dirname, '/app/images');

const store = new Store();

if (process.platform === 'darwin') {
  app.dock.hide();
}

app.on('ready', async () => {
  store.clear(); // uncoment to start from scratch
  debug('Starting bankbar...');

  try {
    const tray = new Tray(`${imagesDir}/icon.png`);
    if (store.has('accessToken') && store.has('refreshToken')) {
      const whoAmI = await get(store, 'whoAmI');
      // todo: remove nested if
      if (whoAmI.authenticated) {
        buildApp(store, tray);
      } else {
        debug('not authenticated. refreshing token');
        const credentials = await getRefreshToken(store);

        store.set('accessToken', credentials.access_token);
        store.set('refreshToken', credentials.refresh_token);

        buildApp(store, tray);
      }
    } else {
      debug('no accessToken or RefreshToken');
      login(store, tray);
    }
  } catch (err) {
    debug(`Error starting app: ${err}`);

    // clear store and restart
    store.clear();
    app.relaunch();
    app.exit();
  }
});
