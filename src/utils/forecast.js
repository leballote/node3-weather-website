const request = require("request");

const WEATHERSTACK_KEY = "845bf541d19149fa9c48fab1bb39da88";

function forecast(lat, lon, callback) {
  const url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${lat},${lon}`
  request({url, json:true}, (error, res) => {
    if (error) {
      callback("Unable to connect to api.weatherstack.com", undefined)
    } else if (res.body.error) {
      callback("Unable to find location (weatherstack)", undefined)
    } else {
      callback(undefined, res.body.current.weather_descriptions[0] + ". It is currently " + res.body.current.temperature + " degress out.")
    }
  })
}

module.exports = forecast;