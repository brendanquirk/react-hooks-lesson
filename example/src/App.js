import React, { useState } from 'react'
import AddForm from './components/AddForm'
import EditForm from './components/EditForm'

const App = () => {
  const peopleList = [
    { id: 1, name: 'Brendan', age: 24 },
    { id: 2, name: 'Matt', age: 34 },
    { id: 3, name: 'Leland', age: 25 },
  ]

  const [people, setPeople] = useState(peopleList)

  const addPerson = (person) => {
    person.id = people.length + 1
    setPeople([...people, person])
  }

  const deletePerson = (id) => {
    setPeople(people.filter((person) => person.id !== id))
  }

  const editPerson = (updatedPerson) => {
    let newPeopleArr = people.map((person) => {
      if (person.id === updatedPerson.id) {
        return updatedPerson
      } else {
        return person
      }
    })
    setPeople(newPeopleArr)
  }

  return (
    <div>
      <h1>React Hooks CRUD</h1>
      <AddForm addPerson={addPerson} />
      {people.map((person) => {
        return (
          <>
            <h3>Name: {person.name}</h3>
            <h5>Age: {person.age}</h5>
            <details>
              <summary>Edit Person</summary>
              <EditForm person={person} editPerson={editPerson} />
            </details>
            <button onClick={() => deletePerson(person.id)}>X</button>
          </>
        )
      })}
    </div>
  )
}

export default App
