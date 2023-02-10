import React from "react";

function App() {

  ////// Destructuring Array/Object //////////
  const [rgbRed, rgbGreen, rgbBlue] = [83, 82, 237]
  console.log(rgbRed)
  console.log(rgbGreen)
  console.log(rgbBlue)

  const state = React.useState()
  console.log(state)

  const [count, setCount] = React.useState(0)

  function increase() {
    setCount(count+1)
  }

  function decrease() {
    setCount(count-1)
  }

  const [greeting, setGreeting] = React.useState("Hello")

  function welcome() {
    setGreeting("Welcome!")
  }

  function goodbye() {
    setGreeting("Thank You!")
  }

  return (
    <div className="container">
    <h1>{count}</h1>
    <button className="sign" onClick={decrease}>-</button>
    <button className="sign" onClick={increase}>+</button>
    <h2>{greeting}</h2>
    <button className="hi" onClick={welcome}>Enter</button>
    <button className="hi" onClick={goodbye}>Exit</button>
  </div>
  );
}

export default App;
