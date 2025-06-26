import axios from "axios";
import { useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon";
import "./Forecast.css";

export default function Forecast(props) {
  let [forecast, setForecast] = useState(null);
  let [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [props.city]);

  function getResponse(response) {
    console.log(response.data);
    setForecast(response.data.daily);
    setLoaded(true);
  }
  function load() {
    axios
      .get(
        `https://api.shecodes.io/weather/v1/forecast?query=${props.city}}&key=71c9o8ef0370bd39a326b41301fb04bt`
      )
      .then(getResponse);
  }
  function date(time) {
    let date = new Date(time * 1000).getDate();
    return date;
  }
  function day(time) {
    let date = new Date(time * 1000);
    let day = date.getDay();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }
  if (loaded) {
    return (
      <div className="grid mt-2 ">
        {forecast.map(function (dayforecast, index) {
          if (index < 6) {
            return (
              <div className="daily-forecast rounded-3" key={index}>
                <div className="daily-forecast-date d-flex justify-content-between ">
                  <div className="date-number">{date(dayforecast.time)}</div>
                  <div className="date-weekday">{day(dayforecast.time)}</div>
                </div>
                <div className="daily-forecast-data d-flex justify-content-between">
                  <div className="daily-icon">
                    {" "}
                    <WeatherIcon code={dayforecast.condition.icon} size={40} />
                  </div>
                  <div className="daily-temperature">
                    <div className="daily-temperature-max ">
                      {props.unit === "fahrenheit"
                        ? Math.round(
                            (dayforecast.temperature.maximum * 9) / 5 + 32
                          )
                        : Math.round(dayforecast.temperature.maximum)}
                      °
                    </div>
                    <div className="daily-temperature-min">
                      {" "}
                      {props.unit === "fahrenheit"
                        ? Math.round(
                            (dayforecast.temperature.minimum * 9) / 5 + 32
                          )
                        : Math.round(dayforecast.temperature.minimum)}
                      °
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  } else {
    load();
    return (<p className="text-white">Loading Forecast Data</p>);
  }
}
