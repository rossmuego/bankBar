const { Menu, clipboard, app, dialog } = require('electron');
const debug = require('debug')('buildApp');
const aboutMenu = require('../app/menus/about');
const contactMenu = require('../app/menus/contact');
const convertToPositive = require('./utils/convertToPositive/convertToPositive');
const formatCurrency = require('./utils/formatCurrency/formatCurrency');
const get = require('./serviceCalls/get');
const optionsMenu = require('../app/menus/options');
const refreshToken = require('./serviceCalls/POST/refreshToken');
const showErrorNotification = require('./notifications/showErrorNotification');
const potTransfer = require('./serviceCalls/PUT/potTransfer');

const buildApp = async (store, tray) => {
  debug('Building App');

  if (process.platform === 'darwin') {
    app.dock.hide();
  }

  try {
    await refreshToken(store);

    const balancePayload = await get(store, 'balance');
    const potsList = await get(store, 'pots');
    const transactionsList = await get(store, 'transactions');

    const { balance, currency, spend_today: spent } = balancePayload;
    const { pots } = potsList;
    const { transactions } = transactionsList;

    const potsSubmenu = pots
      .filter((p) => !p.deleted)
      .map((p) => {
        /*
				electron doesn't support single '&'
				see https://github.com/electron/electron/issues/9584
				*/
        const name = p.name.replace('&', '&&');
        const potTransferOptions = {
          type: 'question',
          buttons: ['Cancel', '£50', '£25', '£10', '£5'],
          cancelId: 0,
          defaultId: 0,
          title: 'Transfer to Pot',
          message: 'How much would you like to transfer?',
          detail: 'Select an amount to be transferred into the selected pot.'
        };

        return {
          label: `${
            p.locked === true ? '🔐' : '🔓'
          } ${name}:  £${formatCurrency(p.balance, p.currency)}`,
          id: p.id,
          click(pot) {
            dialog.showMessageBox(null, potTransferOptions, (valueId) => {
              if (valueId > 0)
                potTransfer(store, pot, valueId, balance, () =>
                  buildApp(store, tray)
                );
            });
          }
        };
      });

    const transactionsSubmenu = transactions
      .filter((t) => t.scheme !== 'uk_retail_pot')
      .filter((t) => t.amount < 0)
      .map((t) => {
        const merchantName = t.merchant ? t.merchant.name : t.description;
        return {
          label: `${merchantName}:  £${convertToPositive(
            formatCurrency(t.amount, t.currency)
          )}`
        };
      });

    const formattedBalance = formatCurrency(balance, currency);
    const formattedSpend = formatCurrency(spent, currency);
    const positiveFormattedSpend = convertToPositive(formattedSpend, currency);

    const sortCode = store.get('sortCode');
    const accountNo = store.get('accountNo');

    const appMenu = Menu.buildFromTemplate([
      {
        label: `Spend today:  £${positiveFormattedSpend}`,
        submenu: transactionsSubmenu.length
          ? transactionsSubmenu.reverse()
          : null
      },
      { type: 'separator' },
      potsSubmenu.length
        ? { label: 'Pots', submenu: potsSubmenu }
        : { label: 'Pots', enabled: false },
      { type: 'separator' },
      {
        label: 'Bank Details',
        submenu: [
          {
            label: `s/c: ${sortCode}`,
            click() {
              clipboard.writeText(sortCode);
            }
          },
          {
            label: `acc: ${accountNo}`,
            click() {
              clipboard.writeText(accountNo);
            }
          },
          { type: 'separator' },
          { label: '(click to copy)', enabled: false }
        ]
      },
      { type: 'separator' },
      optionsMenu(store),
      contactMenu,
      aboutMenu,
      { type: 'separator' },
      {
        label: 'Manual Refresh',
        click() {
          buildApp(store, tray);
        }
      },
      { type: 'separator' },
      { label: 'Quit', role: 'quit' }
    ]);

    tray.setTitle(`£${formattedBalance}`);
    tray.setContextMenu(appMenu);

    debug('App built');
    debug('New state: %O', store.get());
  } catch (err) {
    showErrorNotification(err);
    debug('Error: ', err);
  }
};

module.exports = async (store, tray) => {
  buildApp(store, tray);

  // rebuild every 10mins
  // todo: change this when websockets available from api
  setInterval(buildApp, 600000, store, tray);
};
