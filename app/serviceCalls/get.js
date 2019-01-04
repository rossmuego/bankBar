const fetch = require('node-fetch');
const errorResponse = require('../utils/errorResponse/errorResponse');
const getUrl = require('./getUrl');
const debug = require('debug')('get');

module.exports = async (store, endpoint) => {
  debug(`Fetching ${endpoint}`);

  try {
    const accountId = store.get('accountId');
    const accessToken = store.get('accessToken');
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    const url = getUrl(endpoint, accountId);
    const fullUrl = `https://api.monzo.com${url}`;
    const response = await fetch(fullUrl, options);
    if (errorResponse(response)) {
      throw response;
    }
    const jsonResponse = await response.json();
    debug(`Success fetching ${endpoint}`);
    return jsonResponse;
  } catch (err) {
    debug('Error: ', err);
    throw err;
  }
};
