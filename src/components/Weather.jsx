import React, { useState, useEffect } from 'react';
import './Weather.css';
import search_icon from '../assets/srch.png';
import clear_icon from '../assets/anime.jpg';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Kakkanad');
  const [query, setQuery] = useState('');

  const apiKey = '8ac5c4d57ba6a4b3dfcf622700447b1e';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      setCity(query);
    }
  };

  return (
    <div className='weather'>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder='Search for a city' 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
        <img src={search_icon} alt="Search" onClick={handleSearch} />
      </div>

      {weatherData ? (
        <>
          <img src={clear_icon} alt="Weather Icon" className='weather-icon' />
          <p className='temperature'>{weatherData.main.temp}°C</p>
          <p className='location'>{weatherData.name}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity Icon" />
              <div>
                <p>{weatherData.main.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Icon" />
              <div>
                <p>{weatherData.wind.speed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
