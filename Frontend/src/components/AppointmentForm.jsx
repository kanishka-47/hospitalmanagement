import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

function AppointmentForm() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointment_date, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctor_firstname, setDoctorFirstName] = useState("");
  const [doctor_lastname, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasvisited, setHasVisited] = useState(false);
  const[doctors,setDoctors]=useState([]);
  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
    "3ewqr",
  ];
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/usr/getalldocter",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
      console.log(data.doctors);
    };
    fetchDoctors();
  }, []);
  
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasvisited);
      const { data } = await axios.post(
        "http://localhost:4000/apoimnt/appointment",
        {
          firstname,
          lastname,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date,
          department,
          doctor_firstname,
          doctor_lastname,
          hasvisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setNic(""),
        setDob(""),
        setGender(""),
        setAppointmentDate(""),
        setDepartment(""),
        setDoctorFirstName(""),
        setDoctorLastName(""),
        setHasVisited(""),
        setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
    <div className="container form-component appointment-form">
      <h2>Appointment</h2>
      <form onSubmit={handleAppointment}>
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
            type="date"
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
            type="date"
            placeholder="Appointment Date"
            value={appointment_date}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>
        <div>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setDoctorFirstName("");
              setDoctorLastName("");
            }}
          >
            {departmentsArray.map((depart, index) => {
              return (
                <option value={depart} key={index}>
                  {depart}
                </option>
              );
            })}
          </select>
          <select
            value={`${doctor_firstname} ${doctor_lastname}`}
            onChange={(e) => {
              const [firstname, lastname] = e.target.value.split(" ");
              setDoctorFirstName(firstname);
              setDoctorLastName(lastname);
            }}
            disabled={!department}
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter((doctor) => doctor.doctordepartment === department)
              .map((doctor, index) => (
                <option
                  value={`${doctor.firstName} ${doctor.lastName}`}
                  key={index}
                >
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
          </select>
          
        </div>
        <textarea
          rows="10"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Have you visited before?</p>
          <input
            type="checkbox"
            checked={hasvisited}
            onChange={(e) => setHasVisited(e.target.checked)}
            style={{ flex: "none", width: "25px" }}
          />
        </div>
        <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
      </form>
    </div>
  </>
  )
}

export default AppointmentForm
