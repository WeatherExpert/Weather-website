async function getWeather() {
    const city =  document.getElementById('city-input').value;
    const weatherInfo = document.getElementById('weather-info');
    
    if (!city) {
        weatherInfo.innerHTML = 'Please enter a city name.';
        return;
    }

    const apiKey = '7fe8eded3bbc06cb826c704afa9e18b0'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data); // Log the response data to the console for debugging

        if (data.cod !== 200) {
            weatherInfo.innerHTML = `Error: ${data.message}`;
            return;
        }

        const { name, main, weather, wind } = data;
        const temperature = main.temp;
        const weatherDescription = weather[0].description;
        const humidity = main.humidity;
        const windSpeed = wind.speed;

        weatherInfo.innerHTML = `
            <h2>${name}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Weather: ${weatherDescription}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;
    } catch (error) {
        console.error('Error fetching data:', error); // Log error if something fails
        weatherInfo.innerHTML = 'Error fetching weather data. Please try again.';
    }
}