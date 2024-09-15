//let city, temperature, weatherCondition, date, time, humidity, expectations, gif; 
const baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
//const userLocation = document.querySelector("#location").value.toLowerCase();
const apiKey = '?key=JVADF28JJP4RBZB6GEU9W4MSZ';

let url;


const submitButton = document.querySelector("button");
submitButton.addEventListener("click", displayWeatherData);

async function getApiWeatherData () {
    const response = await fetch(url, {mode: 'cors'});
    const apiWeatherData = await response.json();

    return apiWeatherData;
}

async function extractRequiredAppData () {
    const jsonData = await getApiWeatherData();

    let current = {
        city: jsonData.resolvedAddress,
        expectations: jsonData.description,
        temperature: jsonData.currentConditions.temp,
        weatherCondition: jsonData.currentConditions.conditions,
        date: jsonData.days[0].datetime,
        time: jsonData.currentConditions.datetime,
        humidity: jsonData.currentConditions.humidity,
        gif: jsonData.currentConditions.icon
    };

    return current;
}


async function displayWeatherData() {
    const userLocation = document.querySelector("#location").value.toLowerCase();

    url = baseUrl + userLocation + apiKey;
    console.log(userLocation);
    console.log(url);

    const weatherDataDiv = document.querySelector(".weather");
    let data = await extractRequiredAppData();
    const c = document.createElement('p');
    c.textContent = data.city;
    console.log(data.city);
    weatherDataDiv.appendChild(c);
    
}