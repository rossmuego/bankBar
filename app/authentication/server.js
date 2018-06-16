const Hapi = require('hapi');
const debug = require('debug')('server');

module.exports = async (continueLogin, store, tray) => {
  debug('in server');

  const server = new Hapi.Server({
    host: '127.0.0.1',
    port: '3456',
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
      const authorizationCode = request.query.code;
      store.set('authorizationCode', authorizationCode);
      continueLogin(store, server, tray);
      debug('auth code captured');
      return h.response('Got the code! You can now close this tab.');
    },
  });

  try {
    await server.start();
    debug('server started to capture auth code');
  } catch (err) {
    throw new Error(`Server didn't start: ${err}`);
  }
};
