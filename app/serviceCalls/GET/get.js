const fetch = require('node-fetch');
const errorResponse = require('../../utils/errorResponse/errorResponse');
const getUrl = require('../getUrl');

module.exports = async (store, endpoint) => {
  console.log(`in get ${endpoint}`);

  try {
    let accountId;
    if (endpoint === 'balance') {
      accountId = store.get('accountId');
    }
    const accessToken = store.get('accessToken');
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const url = getUrl(endpoint, accountId);
    const fullUrl = `https://api.monzo.com${url}`;
    const response = await fetch(fullUrl, options);
    if (errorResponse(response)) {
      throw new Error(`Response code: ${response.status}`);
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (err) {
    throw new Error(`Error fetching get${endpoint}: ${err}`);
  }
};
