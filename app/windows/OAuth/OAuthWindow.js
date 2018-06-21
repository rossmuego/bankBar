const { BrowserView, BrowserWindow, shell, ipcMain, app } = require('electron'); // eslint-disable-line
const debug = require('debug')('OAuth');

module.exports = (store) => {
  let win = new BrowserWindow({
    width: 380,
    height: 380,
    titleBarStyle: 'hidden',
    resizable: false,
  });

  win.on('closed', () => {
    win = null;
  });

  const view = new BrowserView({
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.setBrowserView(view);

  view.setBounds({
    x: 0, y: 0, width: 380, height: 380,
  });

  view.webContents.loadURL(`file://${__dirname}/index.html`);

  view.webContents.on('will-navigate', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  ipcMain.on('oAuthInput', (event, payload) => {
    debug(payload);
    store.set(payload);
    app.relaunch();
    app.exit();
  });
};
