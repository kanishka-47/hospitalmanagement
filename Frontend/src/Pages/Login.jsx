import React, { useState } from 'react'
import axios from "axios";
import {toast} from "react-toastify"
import { useContext } from 'react';
import { Authcontext } from '../context/Authuser';
import { Link, useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie"
function Login() {
  const{isAuthenticate,setisAuthenticated,user,setuser}=useContext(Authcontext)
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  // const [confirmpassword,setConfirmPassword]=useState("");
  const navigateTo = useNavigate();
  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
await axios.post("http://localhost:4000/usr/login",{email,password},{
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
}).then((res)=>{
  toast.success(res.data.message);
  setisAuthenticated(true);
  localStorage.setItem("Patient",JSON.stringify(res.data));
  const token=Cookies.get("Patienttoken");
  console.log("tokeeen",token);
  navigateTo("/");
  setEmail("");
  setPassword("");
  setConfirmPassword("");
})
    }catch(error){
toast.error(error.response.data.message);
    }
  };
  if(isAuthenticate){
    return <Navigate to={"/"} />;
  }
  return (
    <>
    <div className="container form-component login-form">
      <h2>Sign In</h2>
      <p>Please Login To Continue</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
        voluptas expedita itaque ex, totam ad quod error?
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
       
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Not Registered?</p>
          <Link
            to={"/register"}
            style={{ textDecoration: "none", color: "#271776ca" }}
          >
            Register Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  </>
  )
}

export default Login
