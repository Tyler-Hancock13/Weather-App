/* window.onload = function() {
    document.getElementById("forecast").style.display = 'none';
} */

let getWeatherForLocation = async () => {

    document.getElementById("forecast").style.display = 'block';

    let city = document.getElementById('location').value;

    const request = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c55b5e9d4864e69d994e516d95e4ffb3`)

    let data = await request.json();
    console.log(data);

    // ---------------------- CALCULATE SUNRISE TIME ----------------
    var sunriseTime = new Date(data.sys.sunrise*1000);
    sunriseTime = subtractHours(sunriseTime, 1);
    console.log(sunriseTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))

    // ---------------------- CALCULATE SUNSET TIME ------------------

    var sunsetTime = new Date(data.sys.sunset * 1000);
    sunsetTime = subtractHours(sunsetTime, 1);

    // ---------------------- CALCULATE LOCAL TIME ZONE ----------
    console.log(data.timezone);
    const secondsFromUTC = data.timezone;

    function subtractHours(date, hours){
        date.setHours(date.getHours() - hours);

        return date;
    }
    
    const utcDate = new Date().toUTCString();
    dateFormat = new Date(Date.parse(utcDate));
    

    const newDate = subtractHours(dateFormat, 6);

    console.log(newDate);
    // ------------------- END OF CALCULATE TIME ZONE --------------
    let cityName = document.getElementById('cityName');
    cityName.innerText = data.name.toString();
    //populateCityForecast(null, data);
    let tempCelsius = data.main.temp - 273.15;
    let currentWeather = data.weather[0].description;
    let weatherIcon = data.weather[0].icon;
    tempCelsius = Math.round(tempCelsius);

    let windSpeed = setWindSpeed(data);
    let humidity = setHumidity(data);
    let pressure = setPressure(data);
    let sunrise = calculateSunrise(data);

    let feelsLike = data.main.feels_like - 273.15;
    feelsLike = Math.round(feelsLike);
    setImageIcon(weatherIcon);

    document.getElementById('cityName').innerHTML = `${data.name.toString()}, ${data.sys.country.toString()}`;
    document.getElementById('cityTemperature').innerHTML = `${tempCelsius.toString()}°C`;
    document.getElementById('wind-speed').innerHTML = `${windSpeed.toString()} km/h`;
    document.getElementById('humidity').innerHTML = `${humidity.toString()}%`;
    document.getElementById('pressure').innerHTML = `${pressure.toString()} mb`;
    document.getElementById('sunrise').innerHTML = `${sunriseTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
    document.getElementById('sunset').innerHTML = `${sunsetTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
};

function setImageIcon(icon){
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

function populateCityForecast(params) {
    let cityName = document.getElementById('#cityName');
    cityName.innerText = params.name.toString();
}

function setWindSpeed(data){
    let windSpeed = data.wind.speed * 3.6;
    windSpeed = Math.round(windSpeed);

    return windSpeed;
}

function setHumidity(data){
    let humidity = data.main.humidity;

    return humidity;
}

function setPressure(data) {
    let pressure = data.main.pressure;

    return pressure;
}

function calculateSunrise(data) {
    let utcTime = Date.now();
}

document.querySelector('#submitLocation').addEventListener('click', getWeatherForLocation);