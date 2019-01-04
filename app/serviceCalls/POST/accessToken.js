const fetch = require('node-fetch');
const FormData = require('form-data');
const errorResponse = require('../../utils/errorResponse/errorResponse');
const debug = require('debug')('accessToken');

module.exports = async (store) => {
  debug('Fetching access token');

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

    const response = await fetch('https://api.monzo.com/oauth2/token', {
      method: 'POST',
      body: form
    });
    if (errorResponse(response)) {
      throw response;
    }
    const jsonResponse = await response.json();

    store.set('accessToken', jsonResponse.access_token);
    store.set('refreshToken', jsonResponse.refresh_token);
    debug('Success fetching access token');
  } catch (err) {
    debug('Error: ', err);
    throw err;
  }
};
