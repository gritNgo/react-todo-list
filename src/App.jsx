import React, { useState } from 'react'

export default function App() {
  const [newItem, setNewItem] = useState("Item 1");
  return (
    <>
      <form className='new-item-form'>
        <div className='form-row'>
          <label htmlFor="text" id="item"></label>
          <input value={newItem} type="text" id="item" />
        </div>
        <button className='btn'>Add</button>
      </form>
      <h1 className='header'>Todo List</h1>
      <ul className='list'>
        <li>
          <label>
            <input type="checkbox" />
            Item 1
          </label>
          <button className='btn btn-danger'>Delete</button>
        </li>
      </ul>
    </>
  )
}
