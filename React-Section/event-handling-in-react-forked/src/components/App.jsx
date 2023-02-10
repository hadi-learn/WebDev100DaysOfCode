import React, { useState } from "react";

function App() {

  const [headingText, setHeadingText] = useState("Hello")

  const [isHover, setIsHover] = useState(false)

  function handleClick() {
    setHeadingText("Submitted")
  }

  function mouseOver() {
    setIsHover(true)
  }

  function mouseOut() {
    setIsHover(false)
  }

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button 
      onClick={handleClick}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
      style={{
        backgroundColor: isHover? 'black' : 'white',
        color: isHover? '#81ecec' : '#50a3a2'
      }}
      >Submit</button>
    </div>
  );
}

export default App;
