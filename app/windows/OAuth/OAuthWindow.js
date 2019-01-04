const { BrowserWindow, shell, ipcMain, app, Menu } = require('electron'); // eslint-disable-line
const debug = require('debug')('OAuth');

module.exports = (store) => {
  debug('Displaying OAuth window');

  let oAuthWindow = new BrowserWindow({
    width: 380,
    height: 380,
    titleBarStyle: 'hidden',
    resizable: false
  });

  oAuthWindow.loadFile('./app/windows/OAuth/index.html');

  const oAuthMenu = [
    {
      label: 'Application',
      submenu: [
        {
          label: 'About Application',
          selector: 'orderFrontStandardAboutPanel:'
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(oAuthMenu));

  oAuthWindow.on('closed', () => {
    oAuthWindow = null;
    app.exit();
  });

  oAuthWindow.webContents.on('will-navigate', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  ipcMain.on('oAuthInput', (event, payload) => {
    store.set(payload);
    app.relaunch();
    app.exit();
  });
};
