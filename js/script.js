const baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const apiKey = '?key=JVADF28JJP4RBZB6GEU9W4MSZ';

let url;

const submitButton = document.querySelector("#user");
submitButton.addEventListener("submit", displayWeatherData);

async function getApiWeatherData () {
    try {
        const response = await fetch(url, {mode: 'cors'});
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const apiWeatherData = await response.json();
        return apiWeatherData;
    } catch (error) {
        throw new Error('No city found');
    }

}

async function extractRequiredAppData () {
    const jsonData = await getApiWeatherData();

    let current = {
        city: jsonData.resolvedAddress,
        expectations: jsonData.description,
        temperature: jsonData.currentConditions.temp,
        weatherCondition: jsonData.currentConditions.conditions,
        date: jsonData.days[0].datetime,
        humidity: jsonData.currentConditions.humidity,
    };

    return current;
}


async function displayWeatherData(e) {
    e.preventDefault();

    const userLocation = document.querySelector("#city").value.toLowerCase();

    url = baseUrl + userLocation + apiKey;
   
    const weatherDataDiv = document.querySelector(".weather");
    weatherDataDiv.innerHTML = ''; 

    try {
        let data = await extractRequiredAppData();
        
        const cityElement = document.createElement('h2');
        cityElement.textContent = data.city;
        weatherDataDiv.appendChild(cityElement);

        const temperatureElement = document.createElement('h3');
        temperatureElement.textContent = data.temperature + 'F';
        weatherDataDiv.appendChild(temperatureElement);

        const weatherConditionElement = document.createElement('p');
        weatherConditionElement.textContent = data.weatherCondition;
        weatherDataDiv.appendChild(weatherConditionElement);

        const humidityElement = document.createElement('p');
        humidityElement.textContent = 'Humidity: ' + data.humidity + '%';
        weatherDataDiv.appendChild(humidityElement);

        const expectationsElement = document.createElement('p');
        expectationsElement.textContent = data.expectations;
        weatherDataDiv.appendChild(expectationsElement);

    } catch (error) {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'No city found. Please try again.';
        weatherDataDiv.appendChild(errorMessage);
    }
    
}