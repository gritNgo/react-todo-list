import { useState } from "react";

export function NewTodoForm({onSubmit}) {

  // used for inputting New Item in the textbox
  const [newItem, setNewItem] = useState("");

    // Creates brand new todo and adds to list
  function handleSubmit(e) {
    // prevents page from refreshing
    e.preventDefault() 
    if (newItem === "") return;

    // props is how addTodo from App.jsx gets passed into this component, allowing to pass info to custom components
    // like props like className, checked, onChange of HTML components
    // onSubmit is this NewTodoForm component's prop (props.onSubmit = addTodo())
    // Whatever prop is used on a component in App, it needs to match inside the function signature in the component
    onSubmit(newItem); 

    setNewItem("");
  }

    // onSubmit eventListener calls handleSubmit function that adds the todos.

    return (
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
    )
}

/**
 * NOTES: 
 * input value={newItem}. Default value is inside the useState signature in this case, "". 
 * The dafault updates whenever the item changes.
 * 
 * In React. if you wanna handle different eventsListeners, you use on(WhateverEvent). 
 * In this case, onChange (everytime I click a single key, it calls onChange) 
 * (works differently than vanilla JS which works just on Blur, or when you stop changin something
 * as you'd use onInput if you wanted something to happen everytime you changed the value in the input).
 * 
 * onChange={e => setNewItem(e.target.value)}. Takes an event (e) object, and calls setNewItem() with the e.target.value:
 * Takes the value of the input, sets it as new item value with the setNewItem f(n) and puts the value in newItem.    
 * 
 * If there was no onChange, the value would stay "" forever.
 * 
 */