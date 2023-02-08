import React from "react";

/////// USING LOGIN AND REGISTER PAGE //////////

// import Login from "./Login";
// import Register from "./Register";

// function Form(props) {
//   return props.userIsRegistered ? <Login /> : <Register />
// }


//////// SMARTER SOLUTION ///////////

import Input from "./Input";
import Button from "./Button";

function Form(props) {
    return (
        <form className="form">
            <Input 
            type="text"
            placeholder="Username"
            />
            <Input 
            type="password"
            placeholder="Password"
            />
            {!props.userIsRegistered && 
                <Input 
                    type="password"
                    placeholder="Confirm Password"
                />}
            <Button 
            type="submit"
            btnName={props.userIsRegistered ? "Login" : "Register"}
            />
      </form>
    )
}

export default Form