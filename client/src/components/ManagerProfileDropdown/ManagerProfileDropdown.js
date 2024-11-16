import React, { useState, useEffect } from 'react';
import ProfileIcon from "../../assets/images/white-profile-icon.png";
import './ManagerProfileDropdown.css'; // Create this CSS file for styling
function ManagerProfileDropdown() {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [weatherComment, setWeatherComment] = useState("Loading data...");
  
    const handleProfileClick = () => {
      setIsDropdownVisible(!isDropdownVisible);
    };
  
    const capitalizeFirstLetters = (text) => {
      return text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
  
    const generateWeatherComment = (description) => {
      if (description.includes("rain") || description.includes("shower")) {
        return "\"It's raining, so expect fewer customers today.\"";
      } else if (description.includes("clear")) {
        return "\"The weather is clear and nice, expect more customers.\"";
      } else if (description.includes("cloud")) {
        return "\"It's cloudy, customer turnout might be moderate.\"";
      } else if (description.includes("snow")) {
        return "\"Snowy weather, expect fewer customers.\"";
      } else if (description.includes("storm") || description.includes("thunder")) {
        return "\"Stormy weather might deter customers from visiting.\"";
      } else {
        return "\"Weather conditions are normal, expect average customer turnout.\"";
      }
    };
  
    const fetchWeatherData = async (lat, lon) => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
  
        if (data && data.main && data.weather) {
          const { temp, humidity } = data.main;
          const { description, icon } = data.weather[0];
  
          setWeatherData({ 
            temp, 
            humidity, 
            description: capitalizeFirstLetters(description), // Capitalize description
            icon 
          });
          setWeatherComment(generateWeatherComment(description));
        } else {
          console.error("Weather data is missing from the API response");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }, []);
  
    return (
      <div className="manager-profile-dropdown">
        <div className="profile-icon" onClick={handleProfileClick}>
          <img src={ProfileIcon} alt="Manager Profile" />
        </div>
  
        {/* {isDropdownVisible && ( */}
          <div className={`profile-dropdown ${isDropdownVisible ? 'show' : ''}`}>
            <p>Welcome Manager!</p>
            <hr />
            <div className="weather-container">
              <div className="weather-section">
                {weatherData ? (
                  <div className="weather-div">
                    <p>{weatherData.description}</p>
                    <p>{weatherData.temp}°F</p>
                    <p>Humidity: {weatherData.humidity}%</p>
                    {weatherData.icon && (
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                        alt={weatherData.description}
                        className="weather-icon"
                      />
                    )}
                  </div>
                ) : (
                  <p>Loading weather...</p>
                )}
              </div>
              <div className="weather-comment">
                <p>{weatherComment}</p>
              </div>
            </div>
            <hr />
            <span className="settings-link" onClick={() => console.log('Navigate to Settings')}>Settings</span>
          </div>
        {/* )} */}
      </div>
    );
  }
  
  export default ManagerProfileDropdown;
  