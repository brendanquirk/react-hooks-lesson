import React, { useState } from 'react'

const AddForm = (props) => {
  const emptyPerson = { id: null, name: '', age: null }

  const [person, setPerson] = useState(emptyPerson)

  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addPerson(person)
    setPerson({ id: null, name: '', age: '' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        value={person.name}
        onChange={handleChange}
      />
      <br />
      <br />
      <label htmlFor="age">Age</label>
      <input
        id="age"
        type="number"
        name="age"
        value={person.age}
        onChange={handleChange}
      />
      <br />
      <br />
      <input type="submit" value="Add Person" />
    </form>
  )
}

export default AddForm
