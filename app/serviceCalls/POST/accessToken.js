const fetch = require('node-fetch');
const FormData = require('form-data');
const errorResponse = require('../../utils/errorResponse/errorResponse');

module.exports = async (store) => {
  console.log('in POSTaccessToken');

  try {
    const form = new FormData();

    const authorizationCode = store.get('authorizationCode');
    const clientId = store.get('clientId');
    const clientSecret = store.get('clientSecret');
    const redirectUri = store.get('redirectUri');

    form.append('grant_type', 'authorization_code');
    form.append('client_id', clientId);
    form.append('client_secret', clientSecret);
    form.append('redirect_uri', redirectUri);
    form.append('code', authorizationCode);

    const response = await fetch(
      'https://api.monzo.com/oauth2/token',
      { method: 'POST', body: form },
    );
    if (errorResponse(response)) {
      throw new Error(`Error response code: ${response.status}`);
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (err) {
    throw new Error(`Error in getAccessToken: ${err}`);
  }
};
