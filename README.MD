weather-app is a command line Node.js application that takes in location info and provides formatted address and weather info.
location info provided by Google Geocode API and weather info by the Dark Sky API.

Location info can be any of the following:
  . Pincode
  . City name
  . Street address

Provide arguments in any of the following formats:
  . node app.js --a '55305'
  . node app.js --a 'Minnetonka' // address argument option can be either --a or --address 
  . node app.js --address='5550 Mall Dr. W Lansing'
  . node app.js --help // help option to see available accepted option arguments.

Weather info provided the follwing data:
  . current temperature.
  . apparent temperature.




