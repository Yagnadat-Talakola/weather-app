const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url:`https://api.darksky.net/forecast/6bc774ec7b4762bdeb9bf4bdae2b367a/${lat},${lng}`,
    json: true 
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature    
      });
    } else {
      callback('unable to fetch weather');
    }
  });
};

module.exports = {
  getWeather
};


