import React, { useState } from "react";

function App2() {

  const [fullName, setFullName] = useState({
    fName: "",
    lName: ""
  })
  
  function changeNameHandler(event) {

    ////////// WITHOUT DESTRUCTURING ////////////
    // const newValue = event.target.value
    // const inputName = event.target.name

    ////////// USING DESTRUCTURING ////////////
    const {value: newValue, name: inputName} = event.target

    setFullName(prevValue => {
        if (inputName === 'fName') {
            return {
                fName: newValue,
                lName: prevValue.lName
            }
        } else {
            return {
                fName: prevValue.fName,
                lName: newValue
            }
        }
    })
  }

  const [completeName, setCompleteName] = useState("")

  function btnClickHandler(event) {
    setCompleteName(fullName.fName + " " + fullName.lName)
    event.preventDefault()
  }
  
  return (
    <div className="container">
      <h1>Hello {fullName.fName} {fullName.lName} {completeName}</h1>
      <form>
        <input 
          name="fName" 
          placeholder="First Name" 
          onChange={changeNameHandler}
          value={fullName.fName}
        />
        <input 
          name="lName" 
          placeholder="Last Name" 
          onChange={changeNameHandler}
          value={fullName.lName}
        />
        <button onClick={btnClickHandler}>Submit</button>
      </form>
    </div>
  );
}

export default App2;
