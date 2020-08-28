const request = require('request-promise-native');

fetchMyIP = function () {
  return request('https://api.ipify.org?format=json')
}

const fetchCoordsByIP = function (body) {
  const coords = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${coords}`)
}

const fetchISSFlyOverTimes = function (body) {
  const { latitude, longitude } = JSON.parse(body).data;
  const url = request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
  return url;
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };