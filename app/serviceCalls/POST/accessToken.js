const fetch = require('node-fetch');
const FormData = require('form-data');
const errorResponse = require('../../utils/errorResponse/errorResponse');

module.exports = async (authorizationCode) => {
  console.log('in POSTaccessToken');

  try {
    const form = new FormData();

    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUri = process.env.REDIRECT_URI;

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
