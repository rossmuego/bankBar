const { shell } = require('electron'); // eslint-disable-line

module.exports = (store) => {
  console.log('in getAuthCode');

  const clientId = store.get('clientId');
  const redirectUri = store.get('redirectUri');
  shell.openExternal(`https://auth.monzo.com/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`);
};
