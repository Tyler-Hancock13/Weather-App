let getCoordinatesForCity = async () => {
    let city = document.getElementById('location').value;

    const request = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=c55b5e9d4864e69d994e516d95e4ffb3`)

    let data = await request.json();
    console.log(data);

    let longitude = data[0].lon;
    let latitude = data[0].lat;

    document.getElementById('cityName').innerHTML = `Current forecast for ${data[0].name.toString()}, ${data[0].country.toString()}`;

    await getWeatherForLocation(longitude, latitude);
};

let getWeatherForLocation = async (longitude, latitude) => {

    const request = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=c55b5e9d4864e69d994e516d95e4ffb3`)

    let data = await request.json();
    console.log(data);

    let tempCelsius = data.current.temp - 273.15;
    tempCelsius = Math.round(tempCelsius);

    let currentWeather = data.current.weather[0].main;

    let feelsLike = data.current.feels_like - 273.15;
    feelsLike = Math.round(feelsLike);


    let weatherIcon = data.current.weather[0].icon;
    setImageIcon(weatherIcon);

    let windSpeed = setWindSpeed(data);
    let humidity = setHumidity(data);
    let pressure = setPressure(data);
    let uvIndex = data.current.uvi;
    let sunriseTime = setSunrise(data);
    let sunsetTime = setSunset(data);
    let localTime = setLocalTime(data);

    document.getElementById('currentWeather').innerHTML = `${currentWeather.toString()}`
    document.getElementById('cityTemperature').innerHTML = `${tempCelsius.toString()}°C`;
    document.getElementById('feels-like').innerHTML = `${feelsLike.toString()}°C`;
    document.getElementById('wind-speed').innerHTML = `${windSpeed.toString()} km/h`;
    document.getElementById('humidity').innerHTML = `${humidity.toString()}%`;
    document.getElementById('pressure').innerHTML = `${pressure.toString()} mb`;
    document.getElementById('uv-index').innerHTML = `${uvIndex.toString()}`;
    document.getElementById('sunrise').innerHTML = `${sunriseTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
    document.getElementById('sunset').innerHTML = `${sunsetTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;

    setFiveDayForecast(data);
}

function setImageIcon(icon){
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

function setWindSpeed(data){
    let windSpeed = data.current.wind_speed * 3.6;
    windSpeed = Math.round(windSpeed);

    return windSpeed;
}

function setHumidity(data){
    let humidity = data.current.humidity;

    return humidity;
}

function setPressure(data) {
    let pressure = data.current.pressure;

    return pressure;
}

function setSunrise(data){
    var sunriseTime = new Date(data.current.sunrise*1000);
    sunriseTime = subtractHours(sunriseTime, 1);

    return sunriseTime;
}

function setSunset(data){
    var sunsetTime = new Date(data.current.sunset*1000);
    sunsetTime = subtractHours(sunsetTime, 1);

    return sunsetTime;
}

function setLocalTime(data){
    var localTime = new Date(data.current.dt*1000);
    localTime = subtractHours(localTime, 1);

    return localTime;
}

function subtractHours(date, hours){
    date.setHours(date.getHours() - hours);

    return date;
}

function setDayOfWeek(){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    var date = new Date();
    console.log(weekday[date.getDay()])

    for(let i = 1; i < 6; i++){ 
        date.setDate(date.getDate() + 1);
        var day = weekday[date.getDay()];

        document.getElementById(`day-${i}`).innerHTML = day;
    }
}

function setFiveDayForecast(data){
    for(let i = 1; i < 6; i++) {
        let icon = data.daily[i].weather[0].icon;
        let temp = data.daily[i].temp.day - 273.15;
        temp = Math.round(temp);

        let wind = data.daily[i].wind_speed * 3.6;
        wind = Math.round(wind);

        let pressure = data.daily[i].pressure;

        setDayOfWeek();

        document.getElementById(`icon-${i}`).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        document.getElementById(`temp-${i}`).innerHTML = `${temp}°C`;
        document.getElementById(`wind-${i}`).innerHTML = `Wind: ${wind} km/h`;
        document.getElementById(`press-${i}`).innerHTML = `Pressure: ${pressure} mb`;
    }
}

document.querySelector('#submitLocation').addEventListener('click', getCoordinatesForCity);