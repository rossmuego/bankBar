const fetch = require('node-fetch');
const errorResponse = require('../../utils/errorResponse/errorResponse');

module.exports = async (accessToken) => {
  console.log('in GETaccount');

  try {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const endpoint = 'https://api.monzo.com/accounts?account_type=uk_retail';
    const response = await fetch(endpoint, options);
    if (errorResponse(response)) {
      throw new Error(`Response code: ${response.status}`);
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (err) {
    throw new Error(`Error fetching getAccount: ${err}`);
  }
};
