import React, { useState } from "react";


let time = new Date().toLocaleTimeString("en-US", {hour12: false})



function App() {
  
  const [currentTime, newTime] = useState(time)

  function getNewTime() {
    newTime(new Date().toLocaleTimeString("en-US", {hour12: false}))
  }

  setInterval(getNewTime, 1000)

  return (
    <div className="container">
      <h1>{currentTime}</h1>
      <button onClick={getNewTime}>Get Time</button>
    </div>
  );
}

export default App;
