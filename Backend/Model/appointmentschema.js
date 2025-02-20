import mongoose from "mongoose";
import validator from "validator";
const appointmentschema=new mongoose.Schema({
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
        type:Date,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"],
    },
appointment_date:{
    type:String,
    required:true,
},
department:{
    type:String,
    required:true,
},
doctor:{
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    }
},
hasvisited:{
    type:Boolean,
   default:false,

},
doctorid:{
    type:mongoose.Schema.ObjectId,
    required:true,
    ref: "User", 
},
patientid:{
    type:mongoose.Schema.ObjectId,
    required:true,
    ref: "User", 
},
address:{
    type:String,
    required:true,
},
status:{
    type:String,
    enum:["pending","accepted","rejected"],
    default:"pending",
}
});

export const Appontment=mongoose.model("appointment",appointmentschema);
