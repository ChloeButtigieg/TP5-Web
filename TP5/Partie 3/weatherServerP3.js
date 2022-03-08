"use strict"

let url_parser = require('url');
let cross_fetch = require('cross-fetch');
let http = require('http');

let server = http.createServer(callback);
server.listen(3000);

async function callback(req, res) {
    let city = process.argv[2];
    let url = url_parser.parse(req.url, true);

    let response = await cross_fetch.fetch("http://api.weatherstack.com/current?access_key=c19316bb4e0248cab2b86a62ba8071fd&query=" + city);
    let data = await response.json();

    let cityName = city;
    let temperature = data["current"]["temperature"];
    let windSpeed = data["current"]["wind_speed"];
    let weatherPicture = data["current"]["weather_icons"][0];
    let weatherDescription = data["current"]["weather_descriptions"][0];

    res.writeHead(200, {'content-type': 'text/html'});
    res.end(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Meteo</title>
                <script src="weather.js"></script>
            </head>
            <body>
                <h1 id="city_name">${cityName}</h1>
                <img id="weather_picture" src=${weatherPicture} alt=${weatherDescription}><br>
                <div id="wind_speed">Vitesse du vent : ${windSpeed}</div>
                <div id="temperature">Température : ${temperature}</div>
            </body>
            </html>`);
}