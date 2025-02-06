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
    console.log(data);
}

// Function to get weather emoji
function getWeatherEmoji(weather) {

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