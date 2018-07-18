const { shell } = require('electron'); // eslint-disable-line

module.exports = {
  label: 'Contact',
  submenu: [
    { label: 'Slack', click() { shell.openExternal('https://join.slack.com/t/bankbar/shared_invite/enQtNDAwMjU0NDgwMzU2LWQ3NGI2M2UxZDhjOGQyODVhOGYzYTUzYzc1ZjczNjA3M2ZlMDc3ZTdhNjIyYmYwNzMwZDJmMTI2ODZhM2NjZjc'); } },
    { label: 'Twitter', click() { shell.openExternal('https://twitter.com/johneas10'); } },
    { label: 'Github', click() { shell.openExternal('https://github.com/johneas10'); } },
  ],
};
