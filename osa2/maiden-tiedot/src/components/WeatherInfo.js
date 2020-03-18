import React from 'react'

const WeatherInfo = ({weather, city}) => {
    console.log(weather)
    return(
      <>
      <h1>Weather in {city}</h1>
      <p>temperature: {weather.temperature} Celsius</p>
      <img src={weather.weather_icons[0]} alt="weather icon"></img>
      <p>wind: {weather.wind_speed} mph direction {weather.wind_dir} </p>
      </>
    )
}

export default WeatherInfo