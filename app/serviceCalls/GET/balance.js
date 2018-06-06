const fetch = require('node-fetch');
const errorResponse = require('../../utils/errorResponse/errorResponse');

module.exports = async (store) => {
  console.log('in GETbalance');

  try {
    const accessToken = store.get('accessToken');
    const accountId = store.get('accountId');
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const endpoint = `https://api.monzo.com/balance?account_id=${accountId}`;
    const response = await fetch(endpoint, options);
    if (errorResponse(response)) {
      throw new Error(`Error response code: ${response.status}`);
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (err) {
    throw new Error(`Error fetching getBalance: ${err}`);
  }
};
