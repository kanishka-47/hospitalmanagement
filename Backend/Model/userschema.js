import mongoose from "mongoose";
import validator from "validator";
const Userschema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"please provide a valid email"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"minimum length of phone is 10"],
        maxLength:[10,"maximum length of phone is 10"],
    },
    nic:{
        type:String,
        required:true,
        minLength:[3,"minimum length of nic is 13"],
        maxLength:[3,"maximum length of nic is 13"],
    },
    dob:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"],
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Patient","Doctor"],
    },
    doctordepartment:{
        type:String,
    },
    docavatr:{
        public_id:String,
        url:String
    }
})

const User=mongoose.model("User",Userschema);

export default User;