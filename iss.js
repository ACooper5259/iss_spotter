const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function (callback) {

  request('https://api.ipify.org?format=json', (error, response, body) => {
    // error such as invalid domain
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const infoReceived = JSON.parse(body);
    const ip = infoReceived['ip'];
    // console.log(ip)
    callback(null, ip);

  });
};


const fetchCoordsByIP = function (ip, callback) {
  request('https://ipvigilante.com/json/75.156.34.27', (error, response, body) => {
    if (error) {
      return callback(error, null)
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const fullDetail = JSON.parse(body);
    const coordinates = {}
    coordinates['latitude'] = fullDetail['data']['latitude']
    coordinates['longitude'] = fullDetail['data']['longitude']
    console.log(coordinates)
    callback(null, coordinates)
  })
}





module.exports = { fetchMyIP, fetchCoordsByIP };