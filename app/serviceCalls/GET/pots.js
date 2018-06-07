const fetch = require('node-fetch');
const errorResponse = require('../../utils/errorResponse/errorResponse');

module.exports = async (store) => {
  console.log('in GETpots');

  try {
    const accessToken = store.get('accessToken');
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const endpoint = 'https://api.monzo.com/pots';
    const response = await fetch(endpoint, options);
    if (errorResponse(response)) {
      throw new Error(`Response code: ${response.status}`);
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (err) {
    throw new Error(`Error fetching getPots: ${err}`);
  }
};
