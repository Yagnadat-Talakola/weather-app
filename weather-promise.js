// promise implementation of weather-app 

const request = require('request');
const yargs = require('yargs');

var argv = yargs.argv;

var geocode = (address) => {
  return new Promise((resolve, reject) => {
    
    var encodedAddress = encodeURIComponent(address);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDxNBPqHbxTV0LnRsXH8sXigtOxsHA_1yw`,
      json: true
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      } else {
        reject('Unable to fetch the data');
      }
    });
    
  });
};

var weather = (lat, lng) => {
  return new Promise((resolve, reject) => {
    request({
      url: `https://api.darksky.net/forecast/6bc774ec7b4762bdeb9bf4bdae2b367a/${lat},${lng}`,
      json: true
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve({
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature 
        });
      } else {
        reject('Unable to fetch the weather data');
      }
    });
  });
};

geocode(argv.address)
.then((location) => {
  console.log(location);
  return weather(location.latitude, location.longitude); 
})
.then((weatherInfo) => {
  console.log(weatherInfo);
})
.catch((e) => {
  console.log(e.message);
});

