// Weather.js
import React, { useEffect, useState } from "react";
import "../styles/Weather.css"; // Import Weather-specific CSS for styling

function Weather() {
  const [weather, setWeather] = useState(null);

  // Fetch weather data from OpenWeatherMap API
  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Ahmedabad&appid=5a56b1951965c53f180c175cc7d6a821&units=metric`
      );
      const data = await response.json();
      setWeather({
        temp: data.main.temp,
        desc: data.weather[0].description,
        icon: data.weather[0].icon,
      });
    } catch (error) {
      console.error("Weather fetch error:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (!weather) {
    return <span>Loading weather...</span>;
  }

  return (
    <div className="weather-container">
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
        alt="Weather Icon"
        className="weather-icon"
      />
      <span className="weather-info">
        {weather.temp}°C | {weather.desc}
      </span>
    </div>
  );
}

export default Weather;
