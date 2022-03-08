"use strict"

let url_parser = require('url');
let cross_fetch = require('cross-fetch');
let http = require('http');
let fs = require('fs');
let mustache = require('mustache');

let server = http.createServer(callback);
server.listen(3000);

async function callback(req, res) {
    let url = url_parser.parse(req.url, true);
    let city = url.query.city;
    if (city == null) {
        res.end(`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Meteo</title>
                </head>
                <body>
                <form action="/" method="GET">
                    <input type="text" name="city" placeholder="Ville">
                    <input type="submit" value="Valider">
                </form>
                </body>
                </html>`);
        return;
    }

    let response = await cross_fetch.fetch("http://api.weatherstack.com/current?access_key=c19316bb4e0248cab2b86a62ba8071fd&query=" + city);
    let data = await response.json();

    let template = fs.readFileSync('weatherTemplate.html').toString();
    let weatherData = {
        cityName: city,
        weatherImage: data["current"]["weather_icons"][0],
        weatherAlt: data["current"]["weather_descriptions"][0],
        temperature: data["current"]["temperature"],
        windSpeed: data["current"]["wind_speed"]
    };

    res.writeHead(200, {'content-type': 'text/html'});
    res.end(mustache.render(template, weatherData));
}