const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP address. Response ${body}`;
      callback(Error(msg), null);
    } else {
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP address. Response ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (!error) {
      if (JSON.parse(body).success === false) {
        callback(`Success status was ${JSON.parse(body).success}. Server message says: ${JSON.parse(body).message} when fetching for IP ${JSON.parse(body).ip}`, null);
        return;
      }
      const data = {};
      data.latitude = JSON.parse(body).latitude;
      data.longitude = JSON.parse(body).longitude;
      callback(null, data);
    }
  });
};

// const coords = {latitude: 49.2827291, longitude: -123.1207375};
// const badCoords = {latitude: 'asdf', longitude: 'fdsa'};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body)  =>  {
    if  (error)  {
      callback(`Error: ${error}`, null);
      return;
    }
    if  (response.statusCode !== 200) {
      callback(`Status Code ${response.statusCode} when fetching IP address. Response ${body}`, null);
      return;
    }
    if (body === 'invalid coordinates') {
      callback(`Error: ${body}`, null);
      return;
    }
    const parsedBody = JSON.parse(body);
    if (parsedBody.message === 'success') {
      callback(null, parsedBody.response);
    }
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if  (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, loc) => {
      if  (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(loc, (error, nextPasses) =>  {
        if  (error) {
          return callback(error, null);
        }
        callback(null, nextPasses)
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

