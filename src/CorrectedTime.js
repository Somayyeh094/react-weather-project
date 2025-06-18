import React from "react";
export default function CorrectedTime({ current }) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[current.getDay()];
  let hours = current.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = current.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return (
    <p>
      {day}, {hours}:{minutes}
    </p>
  );
}
