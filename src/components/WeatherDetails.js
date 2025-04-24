// src/components/WeatherDetails.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WeatherDetails.css";

const recentSearch = [
  "India Gandhinagar",
  "India Gujrat",
  "India Mumbai",
  "India Ahmedabad",
  "India Bangalore",
  "India Delhi",
];

function WeatherDetails() {
  const [searchedText, setSearchedText] = useState("India Gandhinagar");
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const navigate = useNavigate();

  const fetchWeather = async (place) => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=25910174a87a4c63a6c141019230506&q=${place}&aqi=no`
      );
      const data = await res.json();
      setLocationDetails(data.location);
      setWeatherDetails(data.current);
      setSearchedText("");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=25910174a87a4c63a6c141019230506&q=${lat},${lon}&aqi=no`
      );
      const data = await res.json();
      setLocationDetails(data.location);
      setWeatherDetails(data.current);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      (error) => {
        console.log("Geolocation permission denied. Using default.");
        fetchWeather("India Gandhinagar");
      }
    );
  }, []);

  const handleSearch = () => {
    if (searchedText.trim()) fetchWeather(searchedText);
  };

  return (
    <main className="weather-container">
      {weatherDetails && (
        <div className="weather-card">
          {/* Left (Weather Info) */}
          <div className="weather-info">
            <div className="icon-container">
              <img
                src={`https:${weatherDetails.condition.icon}`}
                alt="weather"
              />
            </div>
            <div className="temp-country">
              <h1 className="temp">
                {Math.round(weatherDetails.temp_c)}
                <sup>o</sup>C
              </h1>
              <div>
                <h2>{locationDetails.country}</h2>
                <p>
                  <strong>{locationDetails.name}</strong> •{" "}
                  {locationDetails.localtime}
                </p>
              </div>
              <div className="condition">
                <p>{weatherDetails.condition.text}</p>
                <small>
                  Humidity: {weatherDetails.humidity}%<br />
                  Wind: {weatherDetails.wind_kph} km/h
                </small>
              </div>
            </div>
          </div>

          {/* Right (Search + Recent) */}
          <div className="extra-panel">
            <div className="search-box">
              <input
                value={searchedText}
                onChange={(e) => setSearchedText(e.target.value)}
                placeholder="Search here"
              />
              <button onClick={handleSearch}>Search</button>
            </div>
            <div className="recent-search">
              <p>Recent search</p>
              {recentSearch.map((place) => (
                <p key={place} onClick={() => fetchWeather(place)}>
                  {place}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
      <button className="back-button1" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </main>
  );
}

export default WeatherDetails;
