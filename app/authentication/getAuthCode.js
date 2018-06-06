const { shell } = require('electron'); // eslint-disable-line

module.exports = () => {
  console.log('in getAuthCode');

  const clientId = process.env.CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI;
  shell.openExternal(`https://auth.monzo.com/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`);
};
