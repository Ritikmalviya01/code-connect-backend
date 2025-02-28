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
    console.log(passwordHash)
  
    const user =  new User({
      firstName,
      lastName,
      emailId,
      password : passwordHash,
      gender
    })
    
    await user.save();
    res.send("user added succesfully ")
    } catch(err){
      res.status(400).send("Error  :" + err.message)
    }
  });

authRouter.post("/login",  async (req, res) => {
    try{

        const {emailId , password } = req.body
       if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid")
        }

        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Credentials")
        }

        const isPasswordValid =  bcrypt.compare(password , user.password)
        if(isPasswordValid){
        
        // Create a JWT Token 

        const token = jwt.sign({_id: user._id}, "@ritik")    
   
        
        //Add the token to cookie and send the response back to the user 

        res.cookie("token", token)
        res.send("Login Successfull!!")
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