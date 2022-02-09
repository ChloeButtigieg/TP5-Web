"use strict";

function init() {
    const input = document.querySelector("#input");
    const button = document.querySelector("#button");
    const city_name = document.querySelector("#city_name");
    const temperature = document.querySelector("#temperature");
    const wind_speed = document.querySelector("#wind_speed");
    const weather_picture = document.querySelector("#weather_picture");

    weather_data(input, button, city_name, temperature, wind_speed, weather_picture);
}

async function weather_data(input, button, city_name, temperature, wind_speed, weather_picture) {
    let city;
    let url;
    let api_answer;
    let weather_data;
    while (true) {
        city = await user_input(input, button);

        url = "http://api.weatherstack.com/current?access_key=c19316bb4e0248cab2b86a62ba8071fd&query=" + city;
        api_answer = await fetch(url);
        weather_data = await api_answer.json();

        city_name.innerHTML = city;
        temperature.innerHTML = "Temperature : " + weather_data["current"]["temperature"];
        wind_speed.innerHTML = "Vitesse du vent : " + weather_data["current"]["wind_speed"];
        weather_picture.src = weather_data["current"]["weather_icons"][0];
        weather_picture.alt = weather_data["current"]["weather_descriptions"][0];

        input.value = "";
    }

    function user_input(input, button) {
        let p = new Promise((accept_callback, reject_callback) => {
            button.addEventListener('click', (event) => {
                event.preventDefault()
                accept_callback(input.value);
            });
        });
        return p;
    }

}