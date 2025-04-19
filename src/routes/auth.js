const express = require("express");
const {validationSignUpData} = require("../utils/validation")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const validator = require('validator')
const jwt = require("jsonwebtoken")

const authRouter = express.Router();

authRouter.post("/signup", async (req , res )=>{
    try{
          // Validation Of data  
    validationSignUpData(req);
          // Encrypt the password
  
    const { firstName, lastName, emailId, password, gender} = req.body;
    const passwordHash = await  bcrypt.hash(password, 10)
  
    const user =  new User({
      firstName,
      lastName,
      emailId,
      password : passwordHash,
      gender
    })
    
    const savedUser = await user.save();
    const token = jwt.sign({_id: savedUser._id}, process.env.JWT_SECRET)    
   
        
        //Add the token to cookie and send the response back to the user 

        res.cookie("token", token) 
    res.json({ message : "user added succesfully ", data: savedUser})
    } catch(err){
      res.status(400).send("Error  :" + err.message)
    }
  });

authRouter.post("/login",  async (req, res) => {
    try{

        const {emailId , password } = req.body
      //  if(!validator.isEmail(emailId)){
      //   throw new Error("Email is not valid")
      //   }

        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Credentials")
        }

        const isPasswordValid =  bcrypt.compare(password , user.password)
        if(isPasswordValid){
        
        // Create a JWT Token 

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)    
   
        
        //Add the token to cookie and send the response back to the user 

        res.cookie("token", token) 
        // {
        //   expires: new Date(Date.now() + 8 * 3600000)
        // }
        res.send(user)
        }else {
            throw new Error("Ivalid Credentials")
        }
        
    } catch (err){
        res.status(400).send("Error:" + err.message)

    }
});


authRouter.post("/logout",  async (req, res) => {
   res.cookie("token", null, {
    expires: new Date(Date.now())
   })
   res.send();
});


module.exports = authRouter;