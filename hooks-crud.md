## Hooks CRUD

### Setup

- npx create-react-app hooks-crud
- Replace starter code in App.js with:

```js
import React, { useState } from 'react'

const App = () => {
  return (
    <div>
      <h1>React Hooks CRUD</h1>
    </div>
  )
}

export default App
```

- npm start

### Read

- Lets create some dummy data for us to play around with since we wont be integrating a backend:

```js
const peopleList = [
  { name: 'Brendan', age: 24 },
  { name: 'Matt', age: 34 },
  { name: 'Leland', age: 25 },
]
```

- Next lets set up our state with our useState hook and pass in our peopleList array as the initial state:

```js
const [people, setPeople] = useState(peopleList)
```

![rdt](https://i.imgur.com/c4BYxKz.png)

- Next, just like in React without hooks, lets map over our state(array of people) and display their names and ages:

```js
{
  people.map((person) => {
    return (
      <>
        <h3>Name: {person.name}</h3>
        <h5>Age: {person.age}</h5>
      </>
    )
  })
}
```

![dom](https://i.imgur.com/03IxC9N.png)

### Create

- We are going to separate out our create form into another component so lets `mkdir src/components` and then `touch src/components/AddForm.js` and fill it out with some boilerplate code:

```js
import React from 'react'

// adding props into a functional component like so allows us to use any props passed into this component
const AddForm = (props) => {
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" name="name" />
      <br />
      <br />
      <label htmlFor="age">Age</label>
      <input id="age" type="text" name="age" />
      <br />
      <br />
      <input type="submit" value="Add User" />
    </form>
  )
}

export default AddForm
```

- Next lets import out new component into our top level component and render it to make sure there are no errors, in App.js:

```js
import AddForm from './components/AddForm'
```

AND

```js
<h1>React Hooks CRUD</h1>
<AddForm />
```

![newpage](https://i.imgur.com/7PYCIjw.png)

- Lets start fleshing out our create functionality now, first in App.js lets create our first function:

```js
const addPerson = (person) => {
  person.id = person.length + 1 // this will let us keep an id on each new element
  setPeople([...people, person]) // here we are using the spread operator to add the new person we will be creating into the state of people
}
```

- Next we need to pass this function into our AddForm component as a prop:

```js
<AddForm addPerson={addPerson} />
```

- Now lets go into AddForm.js and do some work there. First lets create an initial state that we will be able to pass up to our main component:

```js
const emptyPerson = { id: null, name: '', age: null }

const [person, setPerson] = useState(emptyPerson)
```

- And add a value on our inputs so we can update the state in a few steps:

```js
<input id="name" type="text" name="name" value={person.name} />
<input id="age" type="text" name="age" value={person.age} />
```

- Now, again like class based React, we can create our handleChange and handleSubmit functions:

```js
const handleChange = (e) => {
  setPerson({ ...person, [e.target.name]: e.target.value })
}

const handleSubmit = (e) => {
  e.preventDefault()
  props.addPerson(person)
}
```

- And lets add our handleChange to our inputs and our handleSubmit to our form:

```js
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
    type="text"
    name="age"
    value={person.age}
    onChange={handleChange}
  />
  <br />
  <br />
  <input type="submit" value="Add Person" />
</form>
```

- Awesome! Now we can add a person (it will go away on refresh as we are not working with a database)

### Delete

- First lets create our deletePerson function:

```js
const deletePerson = (id) => {
  setPeople(people.filter((person) => person.id !== id))
}
```

- Next lets create a button and attach that function onClick:

```js
<button onClick={() => deletePerson(person.id)}>X</button>
```

- Note: We need an anonymous function in the onClick to prevent the function from running on page load and deleting everything right out of the gate.

### Update

- Lets create a new component for our update form `touch src/components/EditForm.js`
- Copy and past everything over from `AddForm.js` and adjust the form as needed:

```js
<form onSubmit={handleSubmit}>
  <label htmlFor="name">Name</label>
  <input id="name" type="text" name="name" onChange={handleChange} />
  <br />
  <br />
  <label htmlFor="age">Age</label>
  <input id="age" type="text" name="age" onChange={handleChange} />
  <br />
  <br />
  <input type="submit" value="Edit Person" />
</form>
```

- Next lets import and render our EditForm in App.js:

```js
<details>
  <summary>Edit Person</summary>
  <EditForm person={person} editPerson={editPerson} />
</details>
```

AND

```js
import EditForm from './components/EditForm'
```

- Next lets create our edit function, we will map over our people array, compare the person's id to the updatedPerson's id and if they match we will return a new array with the updated person in the array, if they dont match we will return the original person, lastly we will use our setter to set the state of people to the new array we made:

```js
const editPerson = (updatedPerson, e) => {
  let newPeopleArr = people.map((person) => {
    if (person.id === updatedPerson.id) {
      return updatedPerson
    } else {
      return person
    }
  })
  setPeople(newPeopleArr)
}
```

- Next we need to pass the function we just made into EditForm as a prop lets also give the EditForm person as a prop:

```js
<EditForm person={person} editPerson={editPerson} />
```

- Next lets add the person thats being passed in's id to the emptyPerson object we have since that should remain the same through the update:

```js
const emptyPerson = { id: props.person.id, name: '', age: '' }
```

- Lastly lets update our handleSubmit function in EditForm so it calls on editPerson instead of createPerson:

```js
const handleSubmit = (e, id) => {
  e.preventDefault()
  props.editPerson(person)
}
```
