import React, {useState, useEffect} from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import axios from 'axios'


const App = () => {
  const [ persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null) 

  const baseUrl = "http://localhost:3001/persons"

  const hook = () => {
    axios
      .get(baseUrl)
      .then(result => setPersons(result.data))
  }

  useEffect(hook, [])

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleFilterChange = event => setFilterText(event.target.value)

  const addPerson = event => {
    event.preventDefault()
    const personToBeChanged = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())   
    if(personToBeChanged){
      replaceTheOldNumber(personToBeChanged)
    } else {
      addNewPerson()
    }
  }

  const replaceTheOldNumber = personToBeChanged => {
    if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      const changedPerson = {...personToBeChanged, number: newNumber}
      axios.put(baseUrl + `/${personToBeChanged.id}`, changedPerson)
        .then(response => {
          console.log(response)
          setPersons(persons.map(person => person.id !== personToBeChanged.id ? person : response.data))
        })
        .catch(error => {
          setErrorMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        }) 
    }
    setNewName('')
    setNewNumber('')
  }

  const addNewPerson = () => {
    const newPerson = {name: newName, number: newNumber}
      axios
        .post(baseUrl, newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Added ${newName}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
        }) 
  }

  const deletePersonById = id => {
    console.log(`delete person with id ${id}`)
    const personToDelete = persons.find(person => person.id === id)
    if(window.confirm(`Do you wan't to delete ${personToDelete.name}`)){
      axios.delete(baseUrl + `/${id}`)
      setPersons(persons.filter(person => person.id !== id))
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
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
