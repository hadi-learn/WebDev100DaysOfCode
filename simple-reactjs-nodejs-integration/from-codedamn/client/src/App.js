import React, { useState, useEffect } from 'react'
import './App.css';

function App() {

  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch(`https://reactapp-api.syukri-hadi.com/message`)
    .then((res) => res.json())
    .then((data) => setMessage(data.message))
  })

  return (
    <div>
      <h1>hi there</h1>
      <h1>{message}</h1>
    </div>
  )
  
}

export default App;
