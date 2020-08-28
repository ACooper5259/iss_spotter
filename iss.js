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

    const fullInfoReceived = JSON.parse(body);
    const ip = fullInfoReceived['ip'];
    // console.log(ip)
    callback(null, ip);

  });
};


const fetchCoordsByIP = function (ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null)
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coords for IP. Response: ${body}`;
      callback((msg), null);
      return;
    }

    const fullInfoReceived = JSON.parse(body);
    const coords = {}
    coords['latitude'] = fullInfoReceived['data']['latitude']
    coords['longitude'] = fullInfoReceived['data']['longitude']
    // console.log(coords)
    callback(null, coords)
  })
}

const fetchISSFlyOverTimes = function (coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords["latitude"]}&lon=${coords["longitude"]}`, (error, response, body) => {


    if (error) {
      return callback(error, null)
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching times for flyover. Response: ${body}`;
      callback((msg), null);
      return;
    }

    // console.log(body)
    const fullInfoReceived = JSON.parse(body)
    //console.log(fullInfoReceived)
    const flyOverTimes = fullInfoReceived['response']
    //console.log(flyOverTimes)
    callback(null, flyOverTimes)


  })
}




module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };