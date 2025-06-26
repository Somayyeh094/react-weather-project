import ReactAnimatedWeather from "react-animated-weather";
import { useState } from "react";
export default function WeatherIcon(props) {
  const [width, setWidth] = useState(window.innerWidth);

  const codeMapping = {
    "clear-sky-night": "CLEAR_NIGHT",
    "few-clouds-night": "PARTLY_CLOUDY_NIGHT",
    "scattered-clouds-night": "PARTLY_CLOUDY_NIGHT",
    "broken-clouds-night": "CLOUDY",
    "shower-rain-night": "RAIN",
    "rain-night": "RAIN",
    "thunderstorm-night": "RAIN",
    "snow-night": "SNOW",
    "mist-night": "FOG",
    "clear-sky-day": "CLEAR_DAY",
    "few-clouds-day": "PARTLY_CLOUDY_DAY",
    "scattered-clouds-day": "PARTLY_CLOUDY_DAY",
    "broken-clouds-day": "CLOUDY",
    "shower-rain-day": "RAIN",
    "rain-day": "RAIN",
    "thunderstorm-day": "RAIN",
    "snow-day": "SNOW",
    "mist-day": "FOG",
  };

  function handleResize() {
    setWidth(window.innerWidth);
  }
  window.addEventListener("resize", handleResize);
 
    if (width <= 763) {
      return (
        <ReactAnimatedWeather
          icon={codeMapping[props.code]}
          color="#ECB62F"
          size={40}
          animate={true}
        />
      );
    } else {
      return (
        <ReactAnimatedWeather
          icon={codeMapping[props.code]}
          color="#ECB62F"
          size={props.size}
          animate={true}
        />
      );
    }
  
}
