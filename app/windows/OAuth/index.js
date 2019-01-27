const { ipcRenderer } = require('electron');

const getInput = () => { // eslint-disable-line
  const id = document.getElementById('client_id').value;
  const secret = document.getElementById('client_secret').value;

  if (id && secret) {
    ipcRenderer.send('oAuthInput', {
      clientId: id,
      clientSecret: secret
    });
  } else {
    alert('Please enter a Client ID and Client Secret');
  }
};
