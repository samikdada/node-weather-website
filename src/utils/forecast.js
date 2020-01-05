const request = require('request')

const forecast = (input, callback) => {
    const url = 'https://api.darksky.net/forecast/93973d2448bd32f2d0e84834772a7d62/' + input + '?units=si';
    request({url, json : true}, (error, {body}) => {

        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else {
            if (body.error) {
                callback(body.error, undefined);
            } else {
                const data = body;
                //console.log(data.currently);

                callback(undefined, {
                    summary: body.daily.data[0].summary,
                    temperature: data.currently.temperature,
                    precipProbability: data.currently.precipProbability
                });
            }
        }
    }); 
}

module.exports = forecast;