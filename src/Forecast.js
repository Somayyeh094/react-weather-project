
import WeatherIcon from "./WeatherIcon";
import "./Forecast.css";

export default function Forecast(props) {
  
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
 
    return (
      <div className="grid mt-2 ">
        {props.forecast.map(function (dayforecast, index) {
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
  
}
