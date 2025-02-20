import { Router } from "express";
import User from "../Model/userschema.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import setuser from "../services/auth.js";
import { isadminauthenticated, ispatientauthenticated } from "../middleware/auth.js";
const router=Router();
router.post("/patientregister",async(req,res)=>{
    const {firstname,lastname,email,phone,nic,dob,gender,password}=req.body;
    const user=await User.findOne({email});
    if(user){
        return res.status(400).json({
            success:false,
            message:"user already registered"
        })
    }
    const hashpassword = await bcrypt.hash(password, 10);

const newuser=new User({
firstname,lastname,email,phone,nic,dob,gender,password:hashpassword,role:"Patient"
});
await newuser.save();

if(newuser){
    
    setuser(newuser, res);
    return res.status(200).json({
        success:true,
        message:"user created successfully"
    })
   
}
})

router.post("/login", async(req, res) => {
    try {
      const { email, password } = req.body;
  
      // Fetch user from the database
      const user = await User.findOne({ email });
      
      // Check if user exists
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not registered",
        });
      }
  
      // Compare the password with the stored hashed password
      const isPasswordMatched = await bcrypt.compare(password, user.password);
  
      // If password does not match
      if (!isPasswordMatched) {
        return res.status(400).json({
          success: false,
          message: "Please enter the correct password",
        });
      }
  
      // If password matches, proceed with login
      setuser(user, res);
      return res.status(200).json({
        success: true,
        message: "Successfully logged in",
      });
  
    } catch (error) {
      // Handle errors
      console.error("Login error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  });

router.post("/addnewadmin",isadminauthenticated,async(req,res)=>{
    const {firstname,lastname,email,phone,nic,dob,gender,password}=req.body;
    const user=await User.findOne({email});
    if(user){
        return res.status(400).json({
            success:false,
            message:"user already registered"
        })
    }
    const Admin=new User({
        firstname,lastname,email,phone,nic,dob,gender,password,role:"Admin"
    });
    await Admin.save();
    if(Admin){
      setuser(Admin,res);
      return res.status(200).json({
        success:true,
        message:"admin successfully registered"
    })
    }
 
})

router.get("/getalldocter",isadminauthenticated,async(req,res)=>{
  const doctors=await User.find({role:"Doctor"});
  return res.status(200).json({
    success:true,
    doctors
})
})

router.get("/admindetails",isadminauthenticated,async(req,res)=>{
  const user=req.user;
  return res.status(200).json({
    success:true,
    user,
})
});

router.get("/patientdetails",ispatientauthenticated,async(req,res)=>{
  const user=req.user;
  return res.status(200).json({
    success:true,
    user,
})
});

router.post("/logoutadmin",isadminauthenticated,async(req,res)=>{
  return res.status(200).cookie("Admintoken","",{
    httpOnly:true,
    secure: true,
    sameSite: "strict",//third party cookies ko allow krne ke liye
  }).json({
    success:true,
    message:"admin user logout successfully"
  })
});

router.post("/logoutpatient",ispatientauthenticated,async(req,res)=>{
  return res.status(200).cookie("Patienttoken","",{
    httpOnly:true,
    secure: true,
    sameSite: "strict",//third party cookies ko allow krne ke liye
  }).json({
    success:true,
    message:"patient user logout successfully"
  })
});

router.post("/addnewdoctor", async (req, res) => {
  try {
    if (!req.files || !req.files.docavatr) {
      return res.status(400).json({
        success: false,
        message: "Doctor avatar is required",
      });
    }

    const { docavatr } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docavatr.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    const { firstname, lastname, email, phone, nic, dob, gender, password, doctordepartment } = req.body;

    const cloudinaryResponse = await cloudinary.uploader.upload(docavatr.tempFilePath);

    const Doctor = new User({
      firstname,
      lastname,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role: "Doctor",
      doctordepartment,
      docavatr: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    await Doctor.save();
    return res.status(200).json({
      success: true,
      message: "Doctor successfully registered",
      Doctor,
    });
  } catch (error) {
    console.error("Error in addnewdoctor route:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});


export default router;