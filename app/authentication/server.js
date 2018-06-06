const Hapi = require('hapi');

module.exports = async (continueLogin, store, tray) => {
  console.log('in server');

  const server = new Hapi.Server({
    host: '127.0.0.1',
    port: '3456',
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
      const authorizationCode = request.query.code;
      continueLogin(authorizationCode, store, server, tray);
      return h.response('Got the code! You can now close this tab.');
    },
  });

  try {
    await server.start();
  } catch (err) {
    throw new Error(`Server didn't start: ${err}`);
  }
};
