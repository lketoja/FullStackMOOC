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

  const baseUrl = "http://localhost:3001/persons"

  const hook = () => {
    axios
      .get(baseUrl)
      .then(result => setPersons(result.data))
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personToBeChanged = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())   
    if(personToBeChanged){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const changedPerson = {...personToBeChanged, number: newNumber}
        axios.put(baseUrl + `/${personToBeChanged.id}`, changedPerson)
          .then(response => {
            console.log(response)
            setPersons(persons.map(person => person.id !== personToBeChanged.id ? person : response.data))
          }) 
      }
      setNewName('')
      setNewNumber('')
    } else {
      const newPerson = {name: newName, number: newNumber}
      axios
        .post(baseUrl, newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        }) 
    }
  }

  const deletePersonById = id => {
    console.log(`delete person with id ${id}`)
    const personToDelete = persons.find(person => person.id === id)
    if(window.confirm(`Do you wan't to delete ${personToDelete.name}`)){
      axios.delete(baseUrl + `/${id}`)
      setPersons(persons.filter(person => person.id !== id))
    }
  }
  
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
        addName={addPerson}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}  
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        filterText={filterText} 
        handleDeleteOf={deletePersonById}
      />
    </div>
  )

}

export default App;
