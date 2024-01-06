import React, { useState } from 'react'
import { NewTodoForm } from './NewTodoForm';
import { TodoList } from './TodoList';

export default function App() {

  // Used for handleSubmit()
  const [todos, setTodos] = useState([]);

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
 * needs to have a key property, unique identifier (id, NOT INDEX). Because when we need to change an element, react needs to 
 * know which. It's a performance optimisattion that ensures code is fast and bug free.
 * 
 * Any type of data you want to have rerender your component when it changes (ex: input/todos), put in state
 * if you wanna modify the existing data you need to pass a function to your setTodos useState function
 * ***YOU CAN'T MANUALLY CHANGE STATE BECAUSE IT'S IMMUTABLE***
 * Any time yo uchange state, it needs to create a brand new object and change a property on it
 * 
 */

/* Any time you need to use the CURRENT value you need to pass a function,
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