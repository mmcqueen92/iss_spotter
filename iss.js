const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200)  {
      const msg = `Status Code ${response.statusCode} when fetching IP address. Response ${body}`;
      callback(Error(msg), null);
    } else {
      const ip = JSON.parse(body).ip;
      callback(error, ip);
    }
  });
};

module.exports = { fetchMyIP };