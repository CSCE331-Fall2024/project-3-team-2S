import React, { useState, useEffect } from 'react';
import ProfileIcon from "../../assets/images/white-profile-icon.png";
import './ManagerProfileDropdown.css'; // Create this CSS file for styling

function ManagerProfileDropdown() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [weatherData, setWeatherData] = useState(null); // State for weather data

  const handleProfileClick = () => {
    setIsDropdownVisible(!isDropdownVisible); // Toggle dropdown visibility
  };

  // Dummy weather data to simulate the API response
  const dummyWeatherData = {
    current: {
      temp: 75, // Temperature in Fahrenheit
      weather: [
        {
          description: "Sunny (DUMMY DATA: WHILE WAITING FOR API KEY TO SET UP)", // Description of the weather
          icon: "01d", // Icon code for sunny weather
        },
      ],
    },
  };

  // UseEffect to simulate data loading
  useEffect(() => {
    // Simulating a delay to mimic API call
    setTimeout(() => {
      const { temp } = dummyWeatherData.current;
      const { description, icon } = dummyWeatherData.current.weather[0];
      
      setWeatherData({
        temp,
        description,
        icon, // Weather icon code
      });
    }, 1000); // Simulating a 1-second delay
  }, []);

  return (
    <div className="manager-profile-dropdown">
      {/* Profile Icon */}
      <div className="profile-icon" onClick={handleProfileClick}>
        <img src={ProfileIcon} alt="Manager Profile" />
      </div>

      {/* Dropdown Section */}
      {isDropdownVisible && (
        <div className="profile-dropdown">
          <p>Welcome Manager!</p>

          <hr></hr>

          <div className="weather-section">
            {weatherData ? (
              <div className="weather-div">
                <p>{weatherData.description}</p>
                <p>{weatherData.temp}°F</p>
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

          <hr></hr>

          <span className="settings-link" onClick={() => console.log('Navigate to Settings')}>Settings</span>
        </div>
      )}
    </div>
  );
}

export default ManagerProfileDropdown;


// import React, { useState, useEffect } from 'react';
// import ProfileIcon from "../../assets/images/white-profile-icon.png";
// import './ManagerProfileDropdown.css'; // Create this CSS file for styling

// function ManagerProfileDropdown() {
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//   const [weatherData, setWeatherData] = useState(null); // State for weather data

//   const handleProfileClick = () => {
//     setIsDropdownVisible(!isDropdownVisible); // Toggle dropdown visibility
//   };

//   // Function to fetch weather data using OpenWeatherMap One Call API
//   const fetchWeatherData = async (lat, lon) => {
//     console.log('API Key:', process.env.REACT_APP_WEATHER_API_KEY);
//     const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
//     const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,daily,alerts&appid=${apiKey}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       const { temp } = data.current;
//       const { description, icon } = data.current.weather[0];
      
//       setWeatherData({
//         temp,
//         description,
//         icon, // Weather icon code
//       });
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//     }
//   };

//   // Get current position using Geolocation API
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         fetchWeatherData(latitude, longitude);
//       });
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   return (
//     <div className="manager-profile-dropdown">
//       {/* Profile Icon */}
//       <div className="profile-icon" onClick={handleProfileClick}>
//         <img src={ProfileIcon} alt="Manager Profile" />
//       </div>

//       {/* Dropdown Section */}
//       {isDropdownVisible && (
//         <div className="profile-dropdown">
//           <p>Welcome Manager!</p>

//           <hr></hr>

//           <div className="weather-section">
//             {weatherData ? (
//               <div className="weather-div">
//                 <p>{weatherData.description}</p>
//                 <p>{weatherData.temp}°F</p>
//                 {weatherData.icon && (
//                   <img
//                     src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
//                     alt={weatherData.description}
//                     className="weather-icon"
//                   />
//                 )}
//               </div>
//             ) : (
//               <p>Loading weather...</p>
//             )}
//           </div>

//           <hr></hr>

//           <span className="settings-link" onClick={() => console.log('Navigate to Settings')}>Settings</span>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ManagerProfileDropdown;
