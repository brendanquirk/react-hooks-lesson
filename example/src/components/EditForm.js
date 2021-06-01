import React, { useState } from 'react'

const EditForm = (props) => {
  const emptyPerson = { id: props.person.id, name: '', age: null }

  const [person, setPerson] = useState(emptyPerson)

  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.editPerson(person)
    setPerson({ id: null, name: '', age: '' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" name="name" onChange={handleChange} />
      <br />
      <br />
      <label htmlFor="age">Age</label>
      <input id="age" type="number" name="age" onChange={handleChange} />
      <br />
      <br />
      <input type="submit" value="Edit Person" />
    </form>
  )
}

export default EditForm
