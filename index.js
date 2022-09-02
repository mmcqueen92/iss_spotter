const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss.js');

// TEST CODE FOR fetchMyIP

// fetchMyIP((error, ip) => {
//   if  (error) {
//     console.log(`It didn't work`, error);
//     return;
//   }
//   console.log(`It worked! Returned IP: `, ip);
// });

//--------
// TEST CODE FOR fetchCoordsByIP

// fetchCoordsByIP('23.16.139.39 ', (error, data) => {
//   console.log(error);
//   console.log(data);
// });

//--------
// TEST CODE FOR fetchISSFlyOverTimes

// const coords = {latitude: 49.2827291, longitude: -123.1207375}
// const badCoords = {latitude: 'asdf', longitude: 'fdsa'}

// fetchISSFlyOverTimes(badCoords, (error, data) => {
//   if  (error) console.log('Error: ', error); return;
//   if  (!error) console.log('Flyover times: ', data);
// })

const printPassTimes = function(passTimes)  {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds`)
  }
}

nextISSTimesForMyLocation((error, passTimes) => {
  if  (error) {
    return console.log('error: ', error);
  }
  printPassTimes(passTimes)
})