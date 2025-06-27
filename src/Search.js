import { useState } from "react";
import "./Search.css";
import logo from "./pin-48.svg";
import axios from "axios";
import CorrectedTime from "./CorrectedTime";
import WeatherIcon from "./WeatherIcon";
import Forecast from "./Forecast"
import { PuffLoader } from "react-spinners";
export default function Search({ defaultCity }) {
  let [city, setCity] = useState(defaultCity);
  let [weather, setWeather] = useState({ ready: false });
  let [forecast, setForecast] = useState(null);
  let [unit, setUnit] = useState("celsius");
  function showUnit(event) {
    setUnit(event.target.value);
  }
  function getWeatherDataForecast(response) {
    console.log(response.data);
    setForecast(response.data.daily);
  }
  function getWeatherData(response) {
    
    setWeather({
      ready: true,
      temperature: Math.round(response.data.temperature.current),
      humidity: response.data.temperature.humidity,
      feels_like: Math.round(response.data.temperature.feels_like),
      pressure: response.data.temperature.pressure,
      wind: Math.round(response.data.wind.speed),
      description:
        response.data.condition.description.substring(0, 1).toUpperCase() +
        response.data.condition.description.substring(1),
      city: response.data.city,
      country: response.data.country,
      icon: response.data.condition.icon,
      time: new Date(response.data.time * 1000),
    });
  }
  function getApi() {
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=71c9o8ef0370bd39a326b41301fb04bt`;
    axios.get(apiUrl).then(getWeatherData);
    axios
      .get(
        `https://api.shecodes.io/weather/v1/forecast?query=${city}}&key=71c9o8ef0370bd39a326b41301fb04bt`
      )
      .then(getWeatherDataForecast);
  }
  function handleSubmit(event) {
    event.preventDefault();
    getApi();
  }
  function getCity(event) {
    setCity(event.target.value);
  }
  if (weather.ready) {
    return (
      <div className="Search container">
        <div className="selection">
          <select className="unit-selection rounded-2" onChange={showUnit}>
            <option value="celsius">°C</option>
            <option value="fahrenheit">°F</option>
          </select>
        </div>
        <form className="text-center" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Type a Location..."
            className="form-search border border-2 rounded-2 p-1"
            onChange={getCity}
          />
          <input
            type="submit"
            value="Search"
            className="form-submit border border-2 rounded-2 ms-2 p-1 fw-bold"
          />
        </form>
        <div className="heading d-flex justify-content-between">
          <div className="location ms-3 text-white mt-4 ps-1 fw-bold">
            <img src={logo} alt="location-icon" width="20px" className="pb-2" />{" "}
            {weather.city}, {weather.country}
          </div>
        </div>
        <div className="weather-data rounded-3 text-white p-2">
          <div className="text-start">
            <p className="current-text">Current Weather</p>

            <CorrectedTime current={weather.time} />
          </div>
          <div className="current-data d-flex justify-content-center">
            <div className="current-icon  ">
              <WeatherIcon code={weather.icon} size={100} />
            </div>
            <div className="current-temperature ps-3">
              <span className="temperature-value">
                {unit === "fahrenheit"
                  ? Math.round((weather.temperature * 9) / 5 + 32)
                  : weather.temperature}
              </span>{" "}
              <span className="temperaure-unit ">
                {" "}
                {unit === "fahrenheit" ? "°F" : "°C"}
              </span>
            </div>
            <div className="current-condition pt-3 ps-3">
              <div className="current-description fw-bold">
                {weather.description}
              </div>
              <div className="current-feel-like">
                Feels like{" "}
                {unit === "fahrenheit"
                  ? Math.round((weather.feels_like * 9) / 5 + 32)
                  : weather.feels_like}
                °
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row weather-properties text-center">
              <div className=" col-4 border rounded-2">
                Wind <br /> {weather.wind}km/h
              </div>
              <div className=" col-4 border rounded-2">
                Humidity
                <br /> {weather.humidity}%
              </div>
              <div className="col-4 border rounded-2">
                Pressure
                <br />
                {weather.pressure}mb
              </div>
            </div>
          </div>
        </div>
        <div className="forecast">
          <Forecast forecast={forecast}  unit={unit} />
        </div>
      </div>
    );
  } else {
    getApi();
    return (
      <div className="loading d-flex justify-content-center">
        <PuffLoader
          color={"white"}
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
}
