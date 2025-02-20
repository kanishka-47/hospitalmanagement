import jwt from "jsonwebtoken";
function setuser(user,res){
    const tocken=jwt.sign({//payload
        id:user._id,
        fullname:user.fullname,
        email:user.email,
    },process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES//life time of tocken
    });
    const cookieName = user.role === 'Admin' ? 'Admintoken' : 'Patienttoken';
    res.cookie(cookieName,tocken,{      
        httpOnly:true,
        secure: true,
        sameSite: "strict",//third party cookies ko allow krne ke liye
    });
}
export default setuser;
