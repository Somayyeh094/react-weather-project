import axios from "axios";
import { useState } from "react";
import "./Forecast.css"

export default function Forecast({ city }) {
  let [forecast, setForecast] = useState(null);
  let [loaded, setLoaded] = useState(false);

  function getResponse(response) {
    console.log(response.data);
      setForecast(response.data.daily);
      setLoaded(true);
  }
  function load() {
    axios
      .get(
        `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=71c9o8ef0370bd39a326b41301fb04bt`
      )
      .then(getResponse);
  }
  if (loaded) {
      return (
        <div className="daily-forecast rounded-3">
          <div className="daily-forecast-date d-flex justify-content-between ">
            <div className="date-number">12</div>
            <div className="date-weekday">Wed</div>
          </div>
          <div className="daily-forecast-data d-flex justify-content-between">
            <div className="daily-icon">🌧️</div>
            <div className="daily-temperature">
              <div className="daily-temperature-max">20°</div>
              <div className="daily-temperature-min">12°</div>
            </div>
          </div>
        </div>
      );
  } else {
    load();
      return null
   
  }
}
