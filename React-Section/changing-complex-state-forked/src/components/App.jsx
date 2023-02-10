import React, { useState } from "react";

function App() {

  const [fNameValue, setfNameValue] = useState("")
  const [lNameValue, setlNameValue] = useState("")
  const [fullName, setFullName] = useState("")

  function fNameHandler(event) {
    setfNameValue(event.target.value)
  }

  function lNameHandler(event) {
    setlNameValue(event.target.value)
  }

  function btnClickHandler(event) {
    setFullName(fNameValue + " " + lNameValue)
    event.preventDefault()
  }
  
  return (
    <div className="container">
      <h1>Hello {fullName}</h1>
      <form>
        <input 
          name="fName" 
          placeholder="First Name" 
          onChange={fNameHandler}
          value={fNameValue}
        />
        <input 
          name="lName" 
          placeholder="Last Name" 
          onChange={lNameHandler}
          value={lNameValue}
        />
        <button onClick={btnClickHandler}>Submit</button>
      </form>
    </div>
  );
}

export default App;
