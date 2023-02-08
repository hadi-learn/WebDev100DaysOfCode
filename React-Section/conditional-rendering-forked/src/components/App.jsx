import React from "react";
import Login from "./Login";

const isLoggedIn = false
const isMe = false
const workTime = true

function App() {
  return (
    <div className="container">
      {isLoggedIn ? <h1>Hello</h1> : isMe ? <h1>Hi Syukri</h1> : <Login />}
      {workTime && <h1>Let's pray hard, work hard.</h1>}
    </div>
  );
}

export default App;
