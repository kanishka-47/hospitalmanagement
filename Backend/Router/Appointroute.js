import { Router } from "express";
import { Appontment } from "../Model/appointmentschema.js";
import User from "../Model/userschema.js";
import { isadminauthenticated, ispatientauthenticated } from "../middleware/auth.js";
const router=Router();

router.post("/appointment", ispatientauthenticated, async (req, res) => {
    const {
      firstname, lastname, email, phone, nic, dob, gender,
      appointment_date, department,
      doctor_firstname, doctor_lastname, hasvisited,
      address, status
    } = req.body;
  
    // Check if all required fields are provided
    if (!firstname || !lastname || !email || !phone || !nic || !dob || !gender ||
        !appointment_date || !department || !doctor_firstname || !doctor_lastname || !address) {
      return res.status(400).json({
        success: false,
        message: "Please fill the full form",
      });
    }
  
    try {
     
  
      // Find the doctor in the database
      const conflict = await User.find({
        firstname: doctor_firstname,
        lastname: doctor_lastname,
        doctordepartment: department,
        role: "Doctor",
      });
  
      if (conflict.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Doctor does not exist",
        });
      }
  
      if (conflict.length > 1) {
        return res.status(400).json({
          success: false,
          message: "Multiple doctors found. Please verify using email or phone number",
        });
      }
  
      const doctorid = conflict[0]._id;
      const patientid = req.user._id;
  
      // Create the appointment
      const appointment = await Appontment.create({
        firstname, lastname, email, phone, nic, dob, gender,
        appointment_date, department,
        doctor: {
          firstname: doctor_firstname,
          lastname: doctor_lastname,
        },
        hasvisited, doctorid, patientid,
        address, status,
      });
  
      return res.status(200).json({
        success: true,
        message: "Appointment created successfully",
      });
  
    } catch (error) {
      console.error("Error in appointment route:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while creating the appointment",
        error: error.message,
      });
    }
  });
  

router.get("/getallappointments",isadminauthenticated,async(req,res)=>{
    const appointments=await Appontment.find();
    if(!appointments){
       return res.status(400).json({
            success:false,
            message:"no appointment found"
        })
    }
   return res.status(200).json({
        success:true,
        appointments,
    })
});

router.put("/updateappointment/:id",ispatientauthenticated,async(req,res)=>{
    const {id}=req.params;
    let appointment=await Appontment.findById(id);
    if(!appointment){
        return res.status(400).json({
            success:false,
            message:"no appointment found"
        })
    };

    appointment=await Appontment.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    return res.status(200).json({
        success:true,
       appointment
    })
});

router.delete("/deleteappointment/:id",isadminauthenticated,async(req,res)=>{
    const {id}=req.params;
    let appointment=await Appontment.findById(id);
    if(!appointment){
       return res.status(400).json({
            success:false,
            message:"no appointment found"
        })
    }
    await appointment.deleteOne();
    return res.status(200).json({
        success:true,
        message:"appointment deleted"
    })
})
export default router;