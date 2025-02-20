import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Authprovider } from "./context/Authuser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure styles are imported

function App() {
  return (
    <>
      <Authprovider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </Authprovider>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
