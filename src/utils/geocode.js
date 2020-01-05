const request = require('request');

const geocode = (address, callback) => {
    const locURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic2FtaWtkYWRhIiwiYSI6ImNrNHF6cXptMDBmaTIza3Npa3U5cHphOW8ifQ.Ut04MnbFLCgyDmQmpK2LqA&limit=1'
    
    request({url : locURL, json : true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else {
            if (body.features.length === 0) {
                callback('Unable to find location! Please enter correct location.', undefined);
            } else {
                const data = body.features[0].center;
                callback(undefined, {
                    longitude: data[1], 
                    latitude: data[0],
                    location: body.features[0].place_name
                });
            }
        }
    });
};

module.exports = geocode;