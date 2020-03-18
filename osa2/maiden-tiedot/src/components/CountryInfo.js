import React from 'react'

const CountryInfo = ({country}) => {

    const renderLanguages = () => {
      return country.languages
        .map(language => <li key={language.name}>{language.name}</li>)
    }
  
    return(
      <>
      <h1>{country.name}</h1>
        <p>captial {country.capital}</p>
        <p>population {country.population}</p>
      <h3>languages</h3>
        <ul>
          {renderLanguages()}
        </ul>
      <img style={{width: 150}} src={country.flag} alt="flag"/>
      </>
    )
}

export default CountryInfo