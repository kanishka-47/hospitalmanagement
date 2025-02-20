import React, { useState } from 'react'
import { createContext } from 'react';
export const Authcontext=createContext();
import Cookies from "js-cookie";
export const Authprovider=(props) =>{
  const initialstate=Cookies.get("Patienttoken") ||Cookies.get("Admintoken") || localStorage.getItem("Patient");
     const[isAuthenticate,setisAuthenticated]=useState(initialstate? true:false);
    const[user,setuser]=useState({});
  return (
   <Authcontext.Provider value={{isAuthenticate,setisAuthenticated,user,setuser}}>
    {props.children}
   </Authcontext.Provider>
  );
}
