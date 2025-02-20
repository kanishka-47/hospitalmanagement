import { Router } from "express";
import Message from "../Model/messageschema.js";
import { isadminauthenticated } from "../middleware/auth.js";

const router=Router();
router.post("/send/message",async(req,res)=>{
    try{

    
const {firstname,lastname,email,phone,message}=req.body;
if(!firstname || !lastname || !email || !phone || !message){
    return res.status(400).json({
        success:false,
        message:"please fill full form"
    })
}
await Message.create({firstname,lastname,email,phone,message});
return res.status(200).json({
    success:true,
    message:"message send successfully"
});}catch(error){
    
  
       // Log error in server console

        return res.status(400).json({
          success: false,
          message: "MongoDB Error Occurred",
          errorType: error.name, // Type of error
          errorMessage: error.message, // Error message
          errorDetails: error, // Complete error object
    });
  }
});

router.get("/allmessages",isadminauthenticated,async(req,res)=>{
    const messages=await Message.find();
    return res.status(200).json({
        success:true,
        messages,
    })
});


export default router; 