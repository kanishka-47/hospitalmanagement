import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Authcontext } from "../context/Authuser";

function UserProfile() {
  const [user, setUser] = useState(null);
  const { isAuthenticate, setisAuthenticated } = useContext(Authcontext);
  const navigate = useNavigate(); // Corrected name from 'navigateto' to 'navigate'

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/googleauth/auth/user", { withCredentials: true });
        console.log("User data:", response.data); // Debugging
        setUser(response.data.user);
        setisAuthenticated(true);
        localStorage.setItem("Patient", JSON.stringify(response.data.user));
        const token = Cookies.get("Patienttoken");
        console.log("Token:", token);

        // Redirect after successful login
        navigate("/");
      } catch (error) {
        console.error("Not logged in:", error);
      }
    };

    fetchUser();
  }, [setisAuthenticated, navigate]);

  // Conditional rendering to avoid null errors
  return isAuthenticate && user ? (
    <div>
      <h1>Welcome, {user.displayName}</h1>
      <img src={user.photos[0].value} alt="Profile" />
    </div>
  ) : (
    <p>Please login</p>
  );
}

export default UserProfile;
