import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  function formHandler(event) {
    const {value: newValue, name: inputName} = event.target
    setContact(prevValue => {
      switch(inputName) {
        case 'fName':
          return {
            fName: newValue,
            lName: prevValue.lName,
            email: prevValue.email
          }
          break
        case 'lName':
          return {
            fName: prevValue.fName,
            lName: newValue,
            email: prevValue.email
          }
          break
        case 'email':
          return {
            fName: prevValue.fName,
            lName: prevValue.lName,
            email: newValue
          }
          break
      }
    })
  }

  const [fullContact, setFullContact] = useState({
    fullName: "",
    email: ""
  })

  function btnClicked(event) {
    setFullContact({
      fullName: contact.fName + " " + contact.lName,
      email: contact.email
    })
    event.preventDefault()
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <h1>
      Hello {fullContact.fullName}
      </h1>
      <p>{contact.email}</p>
      <p>{fullContact.email}</p>
      <form>
        <input 
          name="fName" 
          placeholder="First Name" 
          onChange={formHandler}
        />
        <input 
          name="lName" 
          placeholder="Last Name" 
          onChange={formHandler}
        />
        <input 
          name="email" 
          placeholder="Email" 
          onChange={formHandler}
        />
        <button onClick={btnClicked}>Submit</button>
      </form>
    </div>
  );
}

export default App;
