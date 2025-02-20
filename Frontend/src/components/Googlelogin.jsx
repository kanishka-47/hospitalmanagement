import React from "react";
import { useContext } from "react";
import { Authcontext } from "../context/Authuser";
function GoogleLoginButton() {
  const { isAuthenticate, setisAuthenticated } = useContext(Authcontext);
  const handleLogin = () => {
    window.location.href = "http://localhost:4000/googleauth/auth/google"; // Backend login route
  };
{

}
  return isAuthenticate ? <h2>successfully login</h2>:<button onClick={handleLogin}>Login with Google</button>;
}

export default GoogleLoginButton;
