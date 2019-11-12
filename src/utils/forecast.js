const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a493875f678d2d526f0a8c51a1740009/'
        + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) 
        + '?units=si';
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Error: unable to connect to weather service.', undefined);
        } else if (body.error){
            callback('Error: cannot find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                chance_precipitation: body.currently.precipProbability
            });
        }
    });
};

module.exports = forecast;