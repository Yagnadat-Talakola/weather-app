const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Weather info for the address',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
.argv;


// encodeURIComponent returns string encoded as a URI component.
var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDxNBPqHbxTV0LnRsXH8sXigtOxsHA_1yw`;

// axios module's get method utilizes native promise.
axios.get(geocodeUrl)
.then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }
  console.log(response.data.results[0].formatted_address);
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/6bc774ec7b4762bdeb9bf4bdae2b367a/${lat},${lng}`;
  return axios.get(weatherUrl);
}).then((response) => {
    var currentTemperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${currentTemperature} F. It feels like ${apparentTemperature} F`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers');
    } else {
      console.log(e.message);
    }
});