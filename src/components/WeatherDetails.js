// src/components/WeatherDetails.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WeatherDetails.css"; // Optional CSS for styling the details page

function WeatherDetails() {
  const [weatherDetails, setWeatherDetails] = useState(null);
  const navigate = useNavigate();

  // Fetch weather details for a default city
  const fetchWeatherDetails = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Ahmedabad&appid=5a56b1951965c53f180c175cc7d6a821&units=metric`
    );
    const data = await response.json();
    setWeatherDetails(data);
  };

  useEffect(() => {
    fetchWeatherDetails();
  }, []);

  return (
    <div className="weather-details-container">
      <h1>Weather Details</h1>

      {weatherDetails ? (
        <div className="weather-info">
          <p>
            Location: {weatherDetails.name}, {weatherDetails.sys.country}
          </p>
          <p>Temperature: {weatherDetails.main.temp}°C</p>
          <p>Description: {weatherDetails.weather[0].description}</p>
          <p>Humidity: {weatherDetails.main.humidity}%</p>
          <p>Wind Speed: {weatherDetails.wind.speed} m/s</p>
          {/* <img
            src={`https://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}.png`}
            alt="Weather Icon"
            className="weather-icon"
          /> */}
        </div>
      ) : (
        <p>Loading weather details...</p>
      )}
      <button className="back-button1" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
  );
}

export default WeatherDetails;
