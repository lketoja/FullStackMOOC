import React from 'react'

const Persons = ({persons, filterText, handleDeleteOf}) => 
  
  persons
    .filter(person => 
      person.name.toLowerCase().includes(filterText.toLowerCase())
    )
    .map(person => 
      <p key={person.name}>
        {person.name}: {person.number}
        <button onClick={() => handleDeleteOf(person.id)}>delete</button>
      </p>
    )

export default Persons
