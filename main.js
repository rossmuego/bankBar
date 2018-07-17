require('dotenv').config();

const { app, Tray, Menu } = require('electron'); // eslint-disable-line
const Store = require('electron-store');
const path = require('path');
const login = require('./app/authentication/login');
const buildApp = require('./app/buildApp');
const debug = require('debug')('main');

const imagesDir = path.join(__dirname, '/app/images');
const store = new Store();

const contactMenu = require('./app/menus/contact');
const logout = require('./app/authentication/logout');

app.setAsDefaultProtocolClient('bankbar');

const isSecondInstance = app.makeSingleInstance((commandLine) => { }); // eslint-disable-line
if (isSecondInstance) {
  debug('Quitting second instance');
  app.quit();
}

app.on('ready', async () => {
  debug('starting bankbar...');
  if (process.env.CLEAR_STORE === 'true') {
    store.clear();
    debug('store cleared');
  }

  try {
    const tray = new Tray(`${imagesDir}/icon.png`);

    const authMenu = Menu.buildFromTemplate([
      contactMenu,
      { label: 'Restart', click() { logout(store); } },
      { label: 'Quit', role: 'quit' },
    ]);
    tray.setContextMenu(authMenu);

    debug(store.get());

    if (
      store.has('clientId') &&
      store.has('clientSecret') &&
      store.has('accessToken') &&
      store.has('refreshToken')
    ) {
      await buildApp(store, tray);
    } else {
      login(store, tray);
    }
  } catch (err) {
    debug(`Error starting app: ${err}`);
  }
});
