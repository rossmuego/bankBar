const fetch = require('node-fetch');
const FormData = require('form-data');
const errorResponse = require('../../utils/errorResponse/errorResponse');
const debug = require('debug')('refreshToken');

module.exports = async (store) => {
  debug('Refreshing token');

  try {
    const form = new FormData();

    const clientId = store.get('clientId');
    const clientSecret = store.get('clientSecret');
    const refreshToken = store.get('refreshToken');

    form.append('client_id', clientId);
    form.append('client_secret', clientSecret);
    form.append('refresh_token', refreshToken);
    form.append('grant_type', 'refresh_token');

    const response = await fetch(
      'https://api.monzo.com/oauth2/token',
      { method: 'POST', body: form },
    );
    if (errorResponse(response)) {
      throw response;
    }
    const jsonResponse = await response.json();

    store.set('accessToken', jsonResponse.access_token);
    store.set('refreshToken', jsonResponse.refresh_token);

    debug('Success refreshing access token');
  } catch (err) {
    debug('Error: ', err);
    throw err;
  }
};
