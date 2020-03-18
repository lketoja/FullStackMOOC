import React , {useState, useEffect} from 'react';
import CountryInfo from './components/CountryInfo'
import CountryRow from './components/CountryRow'
import WeatherInfo from './components/WeatherInfo'
import axios from 'axios';

const App = () => {

  const [filterText, setFilterText] = useState('')
  const [countries, setCountries] = useState([])
  const [countryInfo, setCountryInfo] = useState([])
  const [weatherInfo, setWeatherInfo] = useState([])

  const baseUrlCountry = `https://restcountries.eu/rest/v2/all`
  const baseUrlWeather = "http://api.weatherstack.com/current"
  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY

  console.log(weatherApiKey)

  const hook = () => {
    axios
      .get(baseUrlCountry)
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])

  const handleFilterChange = event => {
    const newFilterText = event.target.value.toLowerCase()
    console.log(newFilterText)
    setFilterText(newFilterText)
    showCountent(newFilterText)
  }

  const showCountent = newFilterText => {
    const countriesToShow = countries
      .filter(country => country.name.toLowerCase().includes(newFilterText))
    if(countriesToShow.length === 1){
      const country = countriesToShow[0]
      setCountryInfo(<CountryInfo country={country}/>)
      getWeatherInfo(country.capital)
    } else if (countriesToShow.length <= 10){
      setCountryInfo(countriesToShow.map(country => 
        <CountryRow 
          key={country.name} 
          name={country.name} 
          handleShowClick={() => handleShowClick(country.name)}
        />)
      )
      setWeatherInfo([])
    } else {
      setCountryInfo(<p>Too many matches, specify another filter</p>)
      setWeatherInfo([])
    }
  }

  const getWeatherInfo = async (city) => {
    const response = await axios
      .get(`${baseUrlWeather}?access_key=${weatherApiKey}&query=${city}`)
    const weather = response.data.current
    setWeatherInfo(<WeatherInfo weather={weather} city={city}/>) 
  }

  const handleShowClick = name => {
    const country = countries.find(country => country.name === name)
    setCountryInfo(<CountryInfo country={country}/>)
    getWeatherInfo(country.capital)
  }

   return (
    <>
    <div>
      find countries <input value={filterText} onChange={handleFilterChange} />
    </div>
    <div>
      {countryInfo}
    </div>
    <div>
      {weatherInfo}
    </div>
    </>
  );
}

export default App;

