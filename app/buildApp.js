const { Menu, clipboard } = require('electron'); // eslint-disable-line
const aboutMenu = require('../app/menus/about');
const contactMenu = require('../app/menus/contact');
const formatCurrency = require('./utils/formatCurrency/formatCurrency');
const getBalance = require('./serviceCalls/GET/balance');

const buildApp = async (store, tray) => {
  console.log('in buildApp');

  const balancePayload = await getBalance(store);
  const { balance, currency, spend_today: spent } = balancePayload;

  const formattedBalance = formatCurrency(balance, currency);
  const formattedSpend = formatCurrency(spent, currency);

  const sortCode = store.get('sortCode');
  const accountNo = store.get('accountNo');

  tray.setTitle(`£${formattedBalance}`);

  const appMenu = Menu.buildFromTemplate([
    { label: `Spend today:  £${formattedSpend}` },
    { type: 'separator' },
    {
      label: 'Bank Details',
      submenu: [
        { label: `s/c: ${sortCode}`, click() { clipboard.writeText(sortCode); } },
        { label: `acc: ${accountNo}`, click() { clipboard.writeText(accountNo); } },
        { type: 'separator' },
        { label: '(click to copy)', enabled: false },
      ],
    },
    { type: 'separator' },
    contactMenu,
    aboutMenu,
    { type: 'separator' },
    { label: 'Quit', role: 'quit' },
  ]);
  tray.setContextMenu(appMenu);

  console.log('app built!');
};

module.exports = async (store, tray) => {
  // initial build
  buildApp(store, tray);

  // rebuild every hour
  // todo: this is f*cking ugly
  setInterval(buildApp, 3600000, store, tray);
};
