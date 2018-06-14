const fetch = require('node-fetch');
const errorResponse = require('../utils/errorResponse/errorResponse');
const getUrl = require('./getUrl');
const debug = require('debug')('get');

module.exports = async (store, endpoint) => {
  debug(`fetching ${endpoint}`);

  try {
    const accountId = store.get('accountId');
    const accessToken = store.get('accessToken');
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const url = getUrl(endpoint, accountId);
    const fullUrl = `https://api.monzo.com${url}`;
    debug(`fetching at: ${fullUrl}`);
    const response = await fetch(fullUrl, options);
    if (errorResponse(response)) {
      debug('errorResponse %O:', response.status);
    }
    const jsonResponse = await response.json();
    debug('returning %o:', jsonResponse);
    return jsonResponse;
  } catch (err) {
    debug('error %O:', err);
    throw new Error(err);
  }
};
