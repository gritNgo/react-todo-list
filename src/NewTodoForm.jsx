import { useState } from "react";

export function NewTodoForm({onSubmit}) {

  // used for inputting New Item
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