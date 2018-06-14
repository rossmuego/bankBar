const { Menu, clipboard } = require('electron'); // eslint-disable-line
const aboutMenu = require('../app/menus/about');
const contactMenu = require('../app/menus/contact');
const convertToPositive = require('./utils/convertToPositive/convertToPositive');
const formatCurrency = require('./utils/formatCurrency/formatCurrency');
const get = require('./serviceCalls/GET/get');

const buildApp = async (store, tray) => {
  console.log('in buildApp');

  const balancePayload = await get(store, 'balance');
  const potsList = await get(store, 'pots');

  const { balance, currency, spend_today: spent } = balancePayload;
  const { pots } = potsList;

  const subMenuPots = pots
    .filter(p => !p.deleted)
    .map(p => ({
      label: `${p.name}: £${formatCurrency(p.balance, p.currency)}`,
    }));

  const formattedBalance = formatCurrency(balance, currency);
  const formattedSpend = formatCurrency(spent, currency);
  const positiveFormattedSpend = convertToPositive(formattedSpend, currency);

  const sortCode = store.get('sortCode');
  const accountNo = store.get('accountNo');

  tray.setTitle(`£${formattedBalance}`);

  const appMenu = Menu.buildFromTemplate([
    { label: `Spend today:  £${positiveFormattedSpend}` },
    { type: 'separator' },
    {
      label: 'Pots',
      submenu: subMenuPots,
    },
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
