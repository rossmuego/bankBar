const fetch = require('node-fetch');
const FormData = require('form-data');
const errorResponse = require('../../utils/errorResponse/errorResponse');
const debug = require('debug')('refreshToken');

module.exports = async (store) => {
  debug('in POSTrefreshToken');

  try {
    const form = new FormData();

    const refreshToken = store.get('refreshToken');
    const clientId = store.get('clientId');
    const clientSecret = store.get('clientSecret');

    form.append('grant_type', 'refresh_token');
    form.append('client_id', clientId);
    form.append('client_secret', clientSecret);
    form.append('refresh_token', refreshToken);

    const response = await fetch(
      'https://api.monzo.com/oauth2/token',
      { method: 'POST', body: form },
    );
    if (errorResponse(response)) {
      debug('errorResponse %o:', response);
      throw new Error(response);
    }
    const jsonResponse = await response.json();
    debug('returning %o:', jsonResponse);
    return jsonResponse;
  } catch (err) {
    debug('error %o:', err);
    throw new Error(err);
  }
};
