import React, { useEffect, useState } from 'react'
import { NewTodoForm } from './NewTodoForm';
import { TodoList } from './TodoList';

export default function App() {

  // Used for handleSubmit() to create a brand new todo and add it to the list 
  // and returns an empty array by default for todos in empty-array-returning form:
  // const [todos, setTodos] = useState([]);
  // The idea behind the function returning version below is the same

  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return [];

    return JSON.parse(localValue);
  })

  // useEffect hook is used to save the todos in persistent local storage
  // It does not return anything but takes a function as an argument which says
  // run this function everytime the objects (any of the values) in the array of the second property change: [todos]
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false }, 
      ]
    })
  }

  //update todos to change the id of the todo passed in here to be completed based on the "completed" flag
  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo; // if id != id then return todo with no changes at all
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo}/>
      <h1 className="header">Todo List</h1>
      <TodoList todos = {todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  );
}

/**
 * Notes: 
 * Any time return an array of elements with a .map, each element at the top level
 * needs to have a key property/unique identifier (id, NOT INDEX). Because when we need to change an element, react needs to 
 * know which. It's a performance optimisattion that ensures code is fast and bug free.
 * 
 * Any time you wanna modify variables/have things interactive, use useState hook. This is normally destructured and
 * returns an array of two different values: 
 * 1st: Whatever the value of the thing is (ex: newItem)
 * 2nd: a function for updating the value (ex: setNewItem). Normally set + the name of the 1st value
 * Any type of data you want to have rerender your component when it changes (ex: input/todos), put in state.
 * Whenever the state variable is changed, it always rerenders the entire component and updates the value everywhere it's used. 
 * 
 * if you wanna modify the existing data you NEED to pass a function to your setTodos useState function
 * ***YOU CAN'T MANUALLY CHANGE STATE BECAUSE IT'S IMMUTABLE***
 * Any time you change state, it needs to create a brand new object and changes/update a property on it
 * 
 * Always put hooks at the TOP of the file. 
 * They can never be called conditionally/in ifs/in loops/after returns 
 * They have to run always in the same number 
 * 
 * React components almost always have the same structure: 
 * 1. Hooks at the top
 * 2. Helper functions/code that parses data
 * 3. Finally, "return" that has all of the jsx.
 */

/* Any time you need to use/modify the CURRENT value you need to pass a function to the set state function.
  And this function returns whatever value you want the useState to be. The important thing is that it takes 
  ONE argument, which is the current value for whatever the state is.
    otherwise you can pass the value like setNewItem for <input>
    The code below needs to live inside of the App because that's where the todos useState
    lives && it can't be moved into the form as it's also needed for the list HTML here.
    But need to find a way to update the state in order to add todos */
    
    // setTodos(currentTodos => {
    //   return [
    //     ...currentTodos,
    //     { id: crypto.randomUUID(), title: newItem, completed: false }, 
    //   ]
    // }) 
