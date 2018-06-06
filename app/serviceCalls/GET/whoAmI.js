const fetch = require('node-fetch');
const errorResponse = require('../../utils/errorResponse/errorResponse');

module.exports = async (store) => {
  console.log('in GETwhoAmI');

  try {
    const accessToken = store.get('accessToken');
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const endpoint = 'https://api.monzo.com/ping/whoami';
    const response = await fetch(endpoint, options);
    const jsonResponse = await response.json();
    if (errorResponse(response)) {
      throw new Error(`Error response code: ${response.status}`);
    }
    return jsonResponse;
  } catch (err) {
    throw new Error(`Error fetching whoAmI: ${err}`);
  }
};
