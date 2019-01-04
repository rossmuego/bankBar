require('dotenv').config();

const { app, Tray, Menu } = require('electron'); // eslint-disable-line
const Store = require('electron-store');
const path = require('path');
const debug = require('debug')('main');
const login = require('./app/authentication/login');
const buildApp = require('./app/buildApp');
const contactMenu = require('./app/menus/contact');
const logout = require('./app/authentication/logout');
const showErrorNotification = require('./app/notifications/showErrorNotification');

const imagesDir = path.join(__dirname, '/app/images');
const store = new Store();

app.setAsDefaultProtocolClient('bankbar');

const gotSingleInstance = app.requestSingleInstanceLock();
if (!gotSingleInstance) {
  debug('Quitting second instance');
  app.quit();
}

app.on('ready', async () => {
  debug('Starting app');
  if (process.env.CLEAR_STORE === 'true') {
    store.clear();
    debug('store cleared');
  }
  debug('Starting state: %O', store.get());

  try {
    const tray = new Tray(`${imagesDir}/icon.png`);

    const authMenu = Menu.buildFromTemplate([
      contactMenu,
      {
        label: 'Restart',
        click() {
          logout(store);
        }
      },
      { label: 'Quit', role: 'quit' }
    ]);
    tray.setContextMenu(authMenu);

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
    showErrorNotification(err);
    debug('Error: ', err);
  }
});
