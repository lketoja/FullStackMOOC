import React from 'react'

const CountryRow = ({name, handleShowClick}) => {
  return(
    <>
    <p>{name}</p>
    <button onClick={handleShowClick}>show</button>
    </>
  )
}

export default CountryRow