import React, { useState } from "react";


function App() {

  const [toDo, setToDo] = useState("")
  const [items, setItems] = useState([])

  function inputChangeHandler(event) {
    const newValue = event.target.value
    setToDo(newValue)
  }

  function btnClicked() {
    setItems( (prevValues) => {
      return [...prevValues, toDo]
    })
    setToDo("")
  }

  function createList(list, index) {
    return <li key={index}>{list}</li>
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input 
          type="text"
          onChange={inputChangeHandler}
          value={toDo}
        />
        <button onClick={btnClicked}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map(createList)}
        </ul>
      </div>
    </div>
  );
}

export default App;
