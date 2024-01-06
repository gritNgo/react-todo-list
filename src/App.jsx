import React, { useState } from 'react'

export default function App() {
  // used for inputting New Item
  const [newItem, setNewItem] = useState("");
  
  // Used for handleSubmit()
  const [todos, setTodos] = useState([]);
   
  // Creates brand new todo and adds to list
  function handleSubmit(e) {
    // prevents page from refreshing
    e.preventDefault() 

    // Any time you need to use the CURRENT value you need to pass a function,
    // otherwise you can pass the value like setNewItem for <input>
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false }, 
      ]
    })

    setNewItem("");
  }

  //update todos to change the id of the todo passed in here to be completed based on the "completed" flag
  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed}
        }
        
        return todo; // if id != id then return todo with no changes at all
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='new-item-form'>
        <div className='form-row'>
          <label htmlFor="text" id="item"></label>
          <input 
          value={newItem} 
          onChange={e => setNewItem(e.target.value)} 
          type="text" 
          id="item" 
          />
        </div>
        <button className='btn'>Add</button>
      </form>
      <h1 className='header'>Todo List</h1>
      <ul className='list'>
        {todos.length === 0 && "No todos"}
        {todos.map(todo => {
          return (
          <li key={todo.id}>
          <label>
            <input 
            type="checkbox" 
            checked={todo.completed} 
            onChange={e => toggleTodo(todo.id, e.target.checked)}
            />
            {todo.title}
          </label>
          <button 
          onClick={() => deleteTodo(todo.id)}
          className='btn btn-danger'
          >
          Delete
          </button>
        </li>
        )
        })}
      </ul>
    </>
  )
}

/**
 * Notes: 
 * Any time return an array of elements with a .map, each element at the top level
 * needs to have a key property, unique identifier (id, NOT INDEX). Because when we need to change an element, react needs to 
 * know which. It's a performance optimisattion that ensures code is fast and bug free.
 * 
 * Any type of data you want to have rerender your component when it changes (ex: input/todos), put in state
 * if you wanna modify the existing data you need to pass a function to your setTodos useState function
 * ***YOU CAN'T MANUALLY CHANGE STATE BECAUSE IT'S IMMUTABLE***
 * Any time yo uchange state, it needs to create a brand new object and change a property on it
 * 
 */