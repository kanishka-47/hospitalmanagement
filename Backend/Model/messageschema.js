import mongoose from "mongoose";
import validator from "validator";

const Messageschema=new mongoose.Schema({
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
        validate:[validator.isEmail,"please provide a valid email"]
    },
    phone:{
        type:String,
        required:true,
        minlength:[10,"minimum length of phone is 10"],
        maxlength:[10,"maximum length of phone is 10"],
    },
    message:{
        type:String,
        required:true,
        minlength:[10,"minimum length of message is 10"],
    }
},{timestamps:true});


    const Message=mongoose.model("Message",Messageschema);

    export default Message;