const { response } = require('express');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/', (req,res) => {
    const query = req.body.cityName;
    const openWeatherApiKey = '2c12c2dd4d879a1f7b1c9540ce32be0a';
    const unit = 'metric';
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${openWeatherApiKey}&units=${unit}`;

    https.get(openWeatherUrl, function(response) {
        console.log(response.statusCode);

        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const cityName = weatherData.name;
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const iconCode = weatherData.weather[0].icon;
            res.write(`<h1>The temperature in ${cityName} is ${temp} degrees Celcius.</h1>`);
            res.write(`<h2>The weather is currently ${weatherDescription} in ${query}</h2>`);
            res.write(`<img src='http://openweathermap.org/img/wn/${iconCode}@2x.png' alt='weather icon'><img>`);
            res.send();
        })
    });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
