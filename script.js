const API_KEY = '5c2be8fa30aebe854f739e81cacb9bf8'; // Replace with your OpenWeatherMap API key

document.getElementById('getWeather').addEventListener('click', async () => {
    const location = document.getElementById('location').value.trim();
    const weatherCard = document.getElementById('weatherCard');
    const errorElement = document.getElementById('error');

    // Hide previous results and errors
    weatherCard.style.display = 'none';
    errorElement.style.display = 'none';

    if (!location) {
        errorElement.textContent = 'Please enter a city name.';
        errorElement.style.display = 'block';
        return;
    }

    try {
        // Fetch weather data
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('City not found. Please check the spelling.');
        }

        const data = await response.json();

        // Populate the weather card
        document.getElementById('cityName').textContent = `City: ${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById('conditions').textContent = `Conditions: ${data.weather[0].description}`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;

        weatherCard.style.display = 'block';
    } catch (error) {
        errorElement.textContent = error.message;
        errorElement.style.display = 'block';
    }
});

