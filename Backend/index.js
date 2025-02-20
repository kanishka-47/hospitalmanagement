import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import Messagerouter from "./Router/Messageroute.js"
import Userroute from "./Router/Userroute.js"
import Appointroute from "./Router/Appointroute.js"
import mongoose from "mongoose"
import passport from "passport"
import googleauth from "./Router/googleauth.js"
import session from 'express-session';
import User from "./Model/userschema.js";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
const app=express();

dotenv.config();//use to load environment variable from .env file to procrss.env object
mongoose.connect(process.env.MONGODB_URL, {
    dbName: "Hospital"
  })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Error:", err));

    passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:4000/auth/google/callback",
          },
          async (accessToken, refreshToken,res, profile, done) => {
            // Handle user data here (e.g., save to database)
            try {
              // Check if the user already exists in the database
              let user = await User.findOne({ email: profile.emails[0].value });
              if (!user) {
                // If user doesn't exist, create a new user
                user = await User.create({
                 
                  firstname:profile.displayName,lastname:profile.displayName,email:profile.emails[0].value,phone:"7768685858",nic:"567",dob:78/6/8,gender:"male",password:"76868",role:"Patient",doctordepartment:"gfdh"
                });
              }
            
             
              return done(null, profile);
            } catch (error) {
              return done(error, null);
            }
          }
        )
      );
    
      passport.serializeUser((user, done) => {
        done(null, user);
      });
      
      passport.deserializeUser((user, done) => {
        done(null, user);
      });

      app.use(
        session({
            secret: 'erkhiwyrh',
          resave: false,
          saveUninitialized: true,
        })
      );
      app.use(passport.initialize());
      app.use(passport.session());
      

app.use(cors({//connect frontend and backend
    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    methods: ["GET,POST,PUT,DELETE"],
    credentials: true, //this indicate that browser send cookied and authentication information
}))


// Jyada badi files ka upload fast aur efficient hota hai.
// Temporary files automatically delete nahi hoti, manually clean karni padti hai.
app.use(
    fileUpload({
        useTempFiles:true,//, toh file directly memory me upload hone ke bajaye temporary directory (/tmp/) me save hoti hai.
       // Temp Files Automatically Delete Nahi Hoti!
        //Agar aapko temp folder clean karna hai, toh manually delete karna hoga.
        tempFileDir:"/tmp/",//Temporary files ka location set karta hai.
      })
)

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      // Successful login
      res.redirect('http://localhost:5173');
    }
  );

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    timeout: 60000,
})
app.use(cookieParser());//cookie-parser ek middleware hai jo cookies ko parse karke req.cookies me store karta hai.

app.use(express.json());//iska use json data ko req.body me set krne ke kam aata hai 
app.use(express.urlencoded({extended: false}));//iska use form data ko json me convert krke req.body me set krne ke kam aata hai
app.get("/",(req,res)=>{
    res.send("hello");
})
app.use("/hospital",Messagerouter);
app.use("/usr",Userroute);
app.use("/apoimnt",Appointroute);
app.use("/googleauth",googleauth);

//to start the express server 
app.listen(process.env.PORT,()=>{
    console.log(`SERVER START ON PORT ${process.env.PORT}`)});