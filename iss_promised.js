const request = require('request-promise-native');

fetchMyIP = function () {
  return request('https://api.ipify.org?format=json')

}


module.exports = { fetchMyIP };