import React, {useState, useEffect} from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'


const App = () => {
  const [ persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const hook = () => {
    axios
      .get("http://localhost:3001/persons")
      .then(result => setPersons(result.data))
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()

    const newPerson = {name: newName, number: newNumber}
  
    if(persons.find((person) => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      axios
        .post("http://localhost:3001/persons", newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
     
    }
  }

  const deleteName = name => console.log(`delete ${name}`)

  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        handleFilterChange={handleFilterChange} 
        filterText={filterText}
      />
      <h2>Add a new</h2>
      <PersonForm 
        addName={addName}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}  
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        filterText={filterText} 
        handleDeleteOf={deleteName}
      />
    </div>
  )

}

export default App;
