import React, { useState } from "react";

function App() {

  const [inputName, setInputName] = useState("")
  const [buttonClick, setButtonClick] = useState("")

  function inputOnChangeHandler(event) {
    setInputName(event.target.value)
  }

  function buttonOnClickHandler(event) {
    setButtonClick(inputName)
    event.preventDefault()
  }

  return (
    <div className="container">
      <h1>Hello {buttonClick}</h1>
      <input 
        type="text" 
        placeholder="What's your name?" 
        onChange={inputOnChangeHandler}
        value={inputName}
      />
      <button onClick={buttonOnClickHandler}>Submit</button>

      {/* /////////// THIS IS WITH FORM ////////// */}

      <form onSubmit={buttonOnClickHandler}>
        <h1>Hello {buttonClick}</h1>
        <input 
          type="text" 
          placeholder="What's your name?" 
          onChange={inputOnChangeHandler}
          value={inputName}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
