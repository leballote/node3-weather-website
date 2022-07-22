const request = require("request");

const MAPBOX_KEY = "pk.eyJ1IjoibGViYWxsb3RlIiwiYSI6ImNsNXZteXRxcjAwMzEzaXFzenczYnNuM20ifQ.fdPMceATmnAq11FnEmSWUg";

function geocode(address, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_KEY}&limit=1`;

  request({url: url, json: true}, (error, res)=> {
    if (error) {
      callback("Unable to connect to location services!", undefined)
    } else if (res.body.features.length === 0) {
      callback("Unable to find location. Try another search. (mapbox)", undefined)
    } else {
      const {center, place_name: location} = res.body.features[0]; 

      const [longitude, latitude] = center; 
      callback(undefined, {
        latitude, longitude, location
      })
    }
  })
}

module.exports = geocode;