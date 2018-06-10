const { app, Tray } = require('electron'); // eslint-disable-line
const buildApp = require('./app/buildApp');
const getWhoAmI = require('./app/serviceCalls/GET/whoAmI');
const login = require('./app/authentication/login');
const getRefreshToken = require('./app/serviceCalls/POST/refreshToken');
const path = require('path');
const Store = require('electron-store');

const imagesDir = path.join(__dirname, '/app/images');

const store = new Store();

if (process.platform === 'darwin') {
  app.dock.hide();
}

app.on('ready', async () => {
  // store.clear(); // uncoment to start from scratch
  console.log('starting...');

  try {
    const tray = new Tray(`${imagesDir}/icon.png`);
    if (store.has('accessToken') && store.has('refreshToken')) {
      const whoAmI = await getWhoAmI(store);
      console.log(`authenticated?: ${whoAmI.authenticated}`);

      // todo: remove nested if
      if (whoAmI.authenticated) {
        buildApp(store, tray);
      } else {
        console.log('refreshing token');
        const credentials = await getRefreshToken(store);

        store.set('accessToken', credentials.access_token);
        store.set('refreshToken', credentials.refresh_token);

        buildApp(store, tray);
      }
    } else {
      login(store, tray);
    }
  } catch (err) {
    console.log(`Error starting app: ${err}`);

    // clear and restart
    store.clear();
    app.relaunch();
    app.exit();
  }
});
