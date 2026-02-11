import { useEffect, useState } from "react";
import Search from "../assets/search.png";
import Humidity from "../assets/humidity.png";
import Wind from "../assets/wind.png";
import "./Weather.css";

const KEY_VALUE = import.meta.env.VITE_KEY_VALUE;

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("New Delhi");
  const [inputValue, setInputValue] = useState("");

  const search = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${KEY_VALUE}&q=${city}&aqi=no`
      );
      const data = await response.json();
      if (!data.current) return;

      setWeatherData({
        icon: data.current.condition.icon,
        temperature: data.current.temp_c,
        wind: data.current.wind_kph,
        humidity: data.current.humidity,
        location: `${data.location.name}, ${data.location.country}`,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    search();
  }, [city]);

  const searchCity = () => {
    if (!inputValue.trim()) return;
    setCity(inputValue);
    setInputValue("");
  };

  return (
    <div className="app-container">
      
      {/* Rising Sun */}
      <div className="sun-glow"></div>

      {/* Shiny Clouds */}
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>

      <div className="weather-card">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search city..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchCity()}
          />
          <button onClick={searchCity}>
            <img src={Search} alt="search" />
          </button>
        </div>

        {weatherData && (
          <>
            <div className="weather-info">
              <img
                src={weatherData.icon}
                alt="weather"
                className="weather-icon"
              />
              <h1>{weatherData.temperature}°C</h1>
              <h3>{weatherData.location}</h3>
            </div>

            <div className="details">
              <div className="detail-box">
                <img src={Humidity} alt="humidity" />
                <div>
                  <h4>{weatherData.humidity}%</h4>
                  <p>Humidity</p>
                </div>
              </div>

              <div className="detail-box">
                <img src={Wind} alt="wind" />
                <div>
                  <h4>{weatherData.wind} km/h</h4>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Weather;
