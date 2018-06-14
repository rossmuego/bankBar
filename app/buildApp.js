const { Menu, clipboard } = require('electron'); // eslint-disable-line
const aboutMenu = require('../app/menus/about');
const contactMenu = require('../app/menus/contact');
const convertToPositive = require('./utils/convertToPositive/convertToPositive');
const formatCurrency = require('./utils/formatCurrency/formatCurrency');
const get = require('./serviceCalls/get');
const debug = require('debug')('buildApp');
const getRefreshToken = require('./serviceCalls/POST/refreshToken');

const buildApp = async (store, tray) => {
  debug('building app');

  try {
    // check if token is still valid
    const whoAmI = await get(store, 'whoAmI');
    if (whoAmI && !whoAmI.authenticated) {
      debug('refreshing token while app running...');
      const credentials = await getRefreshToken(store);

      store.set('accessToken', credentials.access_token);
      store.set('refreshToken', credentials.refresh_token);
    }

    const balancePayload = await get(store, 'balance');
    const potsList = await get(store, 'pots');
    const transactionsList = await get(store, 'transactions');

    const { balance, currency, spend_today: spent } = balancePayload;
    const { pots } = potsList;
    const { transactions } = transactionsList;

    const potsSubmenu = pots
      .filter(p => !p.deleted)
      .map(p => ({
        label: `${p.name}:  £${formatCurrency(p.balance, p.currency)}`,
      }));

    const transactionsSubmenu = transactions
      .filter(t => t.scheme !== 'uk_retail_pot')
      .filter(t => t.amount <= 0)
      .map((t) => {
        const merchantName = (t.merchant) ? t.merchant.name : t.description;
        return ({ label: `${merchantName}:  £${convertToPositive(formatCurrency(t.amount, t.currency))}` });
      });

    const formattedBalance = formatCurrency(balance, currency);
    const formattedSpend = formatCurrency(spent, currency);
    const positiveFormattedSpend = convertToPositive(formattedSpend, currency);

    const sortCode = store.get('sortCode');
    const accountNo = store.get('accountNo');

    const appMenu = Menu.buildFromTemplate([
      {
        label: `Spend today:  £${positiveFormattedSpend}`,
        submenu: transactionsSubmenu,
      },
      { type: 'separator' },
      {
        label: 'Pots',
        submenu: potsSubmenu,
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

    tray.setTitle(`£${formattedBalance}`);
    tray.setContextMenu(appMenu);

    debug('app built!');
  } catch (err) {
    debug('error building app: ', err);
  }
};

module.exports = async (store, tray) => {
  // initial build
  buildApp(store, tray);

  // rebuild every hour
  // todo: this is f*cking ugly
  setInterval(buildApp, 3600000, store, tray);
};
