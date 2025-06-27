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
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = days[current.getDay()];
  let hours = current.getHours();
  let date = current.getDate();
  let month = months[current.getMonth()];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = current.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return (
    <p>
      {day}, {date}{" "}{month}, {hours}:{minutes}
    </p>
  );
}
