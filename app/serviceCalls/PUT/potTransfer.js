const fetch = require('node-fetch');
const errorResponse = require('../../utils/errorResponse/errorResponse');
const debug = require('debug');
const dedupe = require('randomstring');
const { dialog } = require('electron');

const transferValues = {
  1: 5000,
  2: 2500,
  3: 1000,
  4: 500
};

module.exports = async (store, pot, valueId, balance, buildApp) => {
  try {
    if (balance < transferValues[valueId]) {
      dialog.showErrorBox(
        'Cannot transfer into Pot.',
        'Your balance is too low, please try again.'
      );
      return;
    }
    const accountId = store.get('accountId');
    const accessToken = store.get('accessToken');
    const dedupeId = dedupe.generate(10);
    const form = new URLSearchParams();
    form.append('source_account_id', accountId);
    form.append('amount', transferValues[valueId].toString());
    form.append('dedupe_id', dedupeId);

    const response = await fetch(
      `https://api.monzo.com/pots/${pot.id}/deposit`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        method: 'PUT',
        body: form
      }
    );
    if (errorResponse(response)) {
      throw response;
    }
  } catch (err) {
    debug('Error: ', err);
    throw err;
  }
  buildApp();
};
