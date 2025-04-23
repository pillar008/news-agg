import React, { useEffect, useState } from 'react';
import '../styles/Weather.css';
import { useNavigate } from 'react-router-dom';

const API_KEY = '5a56b1951965c53f180c175cc7d6a821';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          )
            .then(response => response.json())
            .then(data => {
              setWeatherData({
                temp: Math.round(data.main.temp),
                city: data.name,
                icon: data.weather[0].icon,
                description: data.weather[0].description,
              });
            })
            .catch(error => {
              console.error('Error fetching weather data:', error);
              setLocationError('Failed to fetch weather data.');
            });
        },
        error => {
          console.error('Geolocation error:', error);
          setLocationError('Location permission denied.');
        }
      );
    } else {
      setLocationError('Geolocation not supported.');
    }
  }, []);

  const handleClick = () => {
    navigate('/weather-details');
  };

  return (
    <div className="weather-widget" onClick={handleClick} title="Click for detailed weather">
      {weatherData ? (
        <div className="weather-content">
          <div className="contain">
            <div className="weather-temp">{weatherData.temp}°C</div>
            <div className="weather-city">{weatherData.city}</div>
          </div>
        </div>
      ) : (
        <div className="weather-loading">
          {locationError || 'Loading weather...'}
        </div>
      )}
    </div>
  );
};

export default Weather;
