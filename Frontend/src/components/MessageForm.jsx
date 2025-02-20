import axios from "axios";
import React, { useState } from "react";
import {toast} from "react-toastify"
function MessageForm() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const handleMessage=async(e)=>{
    e.preventDefault();
    try{
await axios.post("http://localhost:4000/hospital/send/message",{firstname,lastname,email,phone,message},
  {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  }
).then((res)=>{
  console.log("success");
  toast.success(res.data.message);
  setFirstName("");
  setLastName("");
  setEmail("");
  setPhone("");
  setMessage("");
})
    }catch (error) {
     
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };
  return (
    <>
      <div className="container form-component message-form">
        <h2>Send Us A Message</h2>
        <form onSubmit={handleMessage}>
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
          <textarea
            rows={7}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Send</button>
          </div>
        </form>
        <img src="/Vector.png" alt="vector" />
      </div>
    </>
  )
}

export default MessageForm
