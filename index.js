const inputForm = document.querySelector('.inputForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = "b479382cb334c4bfaadab076361b9169";

// Event Listener
inputForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherData(weatherData);
        }catch  (error){
            console.log(error);
            displayErrorMessage(error);
        }
    } else {     
        displayErrorMessage('Please enter a city');
    }
});

// Function to get weather data
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);

    console.log(response);

    if (!response.ok) {
        throw new Error('City not found');
    }else{
        return await response.json();
    }
}

// Function to display weather data
function displayWeatherData(data) {
    
    const { name: city, main: {temp, humidity}, weather: [{description, id}] } = data;

    card.textContent = "";
    card.style.display = 'flex';

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherEmoji = document.createElement('p');

    cityDisplay.textContent = city;
    tempDisplay.textContent = `Temperature: ${temp}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');
    humidityDisplay.classList.add('humidityDisplay');
    descDisplay.classList.add('descDisplay');
    weatherEmoji.classList.add('weatherEmoji');

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

// Function to get weather emoji
function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return '⛈️';
    } else if (weatherId >= 300 && weatherId < 500) {
        return '🌧️';
    } else if (weatherId >= 500 && weatherId < 600) {
        return '🌧️';
    } else if (weatherId >= 600 && weatherId < 700) {
        return '❄️';
    } else if (weatherId >= 700 && weatherId < 800) {
        return '🌫️';
    } else if (weatherId === 800) {
        return '☀️';
    } else if (weatherId > 800) {
        return '☁️';
    }
    
}

// Function to display error message
function displayErrorMessage(message) {
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');

    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
}