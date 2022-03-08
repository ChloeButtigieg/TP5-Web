"use strict"

let url_parser = require('url');
let http = require('http');

let server = http.createServer(callback);
server.listen(3000);

function callback(req, res) {
    let url = url_parser.parse(req.url, true);
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Meteo</title>
        </head>
        <body>
            <input id="input" type="text" placeholder="Ville">
            <button id="button">Submit</button><br>
            <h1 id="city_name">Marseille, France</h1>
            <img id="weather_picture" src="https:\\/\\/assets.weatherstack.com\\/images\\/wsymbols01_png_64\\/wsymbol_0008_clear_sky_night.png" alt="Clear"><br>
            <ul>
                <li id="wind_speed">Vent : 7</li>
                <li id="temperature">Température : 8</li>
                <li id="weather">Temps : Clear</li>
            </ul>
        </body>
        </html>`);
}