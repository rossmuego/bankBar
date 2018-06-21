const { ipcRenderer } = require('electron'); // eslint-disable-line

const getInput = () => { // eslint-disable-line
  const id = document.getElementById('client_id').value; // eslint-disable-line
  const secret = document.getElementById('client_secret').value; // eslint-disable-line

  ipcRenderer.send('oAuthInput', {
    clientId: id,
    clientSecret: secret,
  });
};
