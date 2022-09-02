const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org/?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip
  return request(`https://ipwho.is/${ip}`)
}

const fetchISSFlyOverTimes = (body) =>  {
  const parsedBody = JSON.parse(body);
  const coords = {};
  coords.latitude = parsedBody.latitude;
  coords.longitude = parsedBody.longitude;
  return request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`)
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    })
    .catch((error) => {
      console.log(`Something didn't work. Error: `, error.message);
    });
}

module.exports = { nextISSTimesForMyLocation }