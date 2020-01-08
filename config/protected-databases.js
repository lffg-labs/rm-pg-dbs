const { userInfo } = require('os');

function getProtectedDatabases() {
  return process.env.ALLOW_ANY_DROP
    ? []
    : [userInfo().username, 'postgres', 'template0', 'template1'];
}

module.exports = {
  getProtectedDatabases
};
