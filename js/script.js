let city, temperature, weatherCondition, date, time, humidity, expectations, gif; 

url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=JVADF28JJP4RBZB6GEU9W4MSZ';

async function getWeatherData () {
    const response = await fetch(url, {mode: 'cors'});
    const weatherData = await response.json();

    city = weatherData.resolvedAddress;
    expectations = weatherData.description;
    temperature = weatherData.currentConditions.temp;
    weatherCondition = weatherData.currentConditions.conditions;
    date = weatherData.days[0].datetime;
    time = weatherData.currentConditions.datetime;
    humidity = weatherData.currentConditions.humidity;
    gif = weatherData.currentConditions.icon;

    console.log(city);
    console.log(date);
    console.log(time);
    console.log(temperature);
    console.log(weatherCondition);
    console.log(expectations);
    console.log(gif);
}

getWeatherData();