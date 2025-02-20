import React, { useState } from 'react'
import axios from "axios";
import {toast} from "react-toastify"
import { useContext } from 'react';
import { Authcontext } from '../context/Authuser';
import { Link, useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie"
function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const{isAuthenticate,setisAuthenticated,user,setuser}=useContext(Authcontext);
  const navigateTo = useNavigate();
  const handleRegistration=async(e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:4000/usr/patientregister",{firstname,lastname,email,
        phone,nic,dob,gender,password,role:"Patient"},{
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }).then((res)=>{
          toast.success(res.data.message);
          setisAuthenticated(true);
          localStorage.setItem("Patient",JSON.stringify(res.data));
          const token=Cookies.get("Patienttoken");
          console.log("tokeeen",token);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
          setPassword("");
        })
    } catch (error) {
      toast.error(error.response.data.message);
    }
   
  }
   if(isAuthenticate){
    return <Navigate to={"/"} />;
   }
  return (
    <>
      <div className="container form-component register-form">
        <h2>Sign Up</h2>
        <p>Please Sign Up To Continue</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
          voluptas expedita itaque ex, totam ad quod error?
        </p>
        <form onSubmit={handleRegistration}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <input
              type={"date"}
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Already Registered?</p>
            <Link
              to={"/signin"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Login Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
