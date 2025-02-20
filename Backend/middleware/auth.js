import User from "../Model/userschema.js";
import jwt from "jsonwebtoken";
export const isadminauthenticated=async (req, res, next) => {
    const token = req.cookies.Admintoken;
  
    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Admin not authenticated",
      });
    }
  
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);//return user with related token
      
      // Fetch user from database
      const user = await User.findById(decoded.id);
  
      // Check if user exists and has Admin role
      if (!user || user.role !== "Admin") {
        return res.status(401).json({
          success: false,
          message: "Admin not authenticated",
        });
      }
  
      // Attach user to request object
      req.user = user;
  
      // Pass control to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };

export const ispatientauthenticated=async(req,res,next)=>{
    const token=req.cookies.Patienttoken;
    if(!token){
       return res.status(400).json({
            success:false,
            message:"patient not authenticated"
        })
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
   const user=await User.findById(decoded.id);
    if(!user || user.role!=="Patient"){
       return res.status(400).json({
            success:false,
            message:"patient not authenticated"
        })
    }
     req.user = user;
    next();

};