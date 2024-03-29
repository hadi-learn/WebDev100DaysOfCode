import React from "react";
import Input from "./Input";
import Button from "./Button";

function Login() {
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
        <Button 
          type="submit"
          btnName="Login"
        />
      </form>
    )
}

export default Login