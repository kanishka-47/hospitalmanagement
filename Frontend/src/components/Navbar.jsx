import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Authcontext } from '../context/Authuser'
import { useNavigate,Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react'
function Navbar() {
  const [show, setShow] = useState(false);
  const{isAuthenticate,setisAuthenticated}=useContext(Authcontext);
  const handleLogout=async()=>{
    await axios.get("",{
      withCredentials: true,
    }).then((res)=>{
      toast.success(res.data.message);
      setisAuthenticated(false);
      localStorage.setItem("Patient","");
    }).catch((error)=>{
      toast.error(error.response.data.message);
    })
  }
const navigateto=useNavigate();
  const goToLogin=async()=>{
navigateto("/login");
  }
  return (
    <>
    <nav className={"container"}>
      <div className="logo">
        <img src="/logo.png" alt="logo" className="logo-img" />
      </div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to={"/"} onClick={() => setShow(!show)}>
            Home
          </Link>
          <Link to={"/appointment"} onClick={() => setShow(!show)}>
            Appointment
          </Link>
          <Link to={"/about"} onClick={() => setShow(!show)}>
            About Us
          </Link>
        </div>
        {isAuthenticate ? (
          <button className="logoutBtn btn" onClick={handleLogout}>
            LOGOUT
          </button>
        ) : (
          <button className="loginBtn btn" onClick={goToLogin}>
            LOGIN
          </button>
        )}
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  </>
  )
}

export default Navbar
