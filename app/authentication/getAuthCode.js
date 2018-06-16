const { shell } = require('electron'); // eslint-disable-line
const debug = require('debug')('getAuthCode');

module.exports = (store) => {
  debug('asking user access to account');

  const clientId = store.get('clientId');
  const redirectUri = store.get('redirectUri');
  shell.openExternal(`https://auth.monzo.com/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`);
};
