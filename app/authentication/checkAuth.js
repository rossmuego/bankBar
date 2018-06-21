const get = require('../serviceCalls/get');
const getRefreshToken = require('../serviceCalls/POST/refreshToken');
const debug = require('debug')('checkAuth');


module.exports = async (store) => {
  const whoAmI = await get(store, 'whoAmI');

  if (whoAmI && !whoAmI.authenticated) {
    debug('not authenticated. refreshing token');
    const credentials = await getRefreshToken(store);

    store.set('accessToken', credentials.access_token);
    store.set('refreshToken', credentials.refresh_token);
  }
  debug('authenticated');
};
