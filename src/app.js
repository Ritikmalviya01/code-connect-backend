const express = require('express')
const connectDB = require("./config/database")
const app = express()
const User = require("./models/user")
const {validationSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")
app.use(express.json())
const validator = require('validator')


// post user detail 
app.post("/signup", async (req , res )=>{
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
})

// post login
app.post("/login",  async (req, res) => {
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
            res.send("Login Successfull!!")
        }else {
            throw new Error("Ivalid Credentials")
        }
        
    } catch (err){
        res.status(400).send("Error:" + err.message)

    }
})
 
// get user by email
app.get("/user" , async (req , res)=>{
    const userEmail = req.body.emailId;
    try{
       const users =  await User.find({emailId: userEmail });
       if(users.length === 0){
        res.status(400).send("Something went wrong")
    }
        res.send(users)
        } catch(err){
          res.status(400).send("Something went wrong")
        }

})
// get all the users from the data base 
app.get("/feed" , async (req, res) => {
    try{
        const users =  await User.find({});
         res.send(users)
         } catch(err){
           res.status(400).send("Something went wrong")
         }
})
//delete the user 
app.delete("/user" , async (req, res) => {
    try{
        const users =  await User.findByIdAndDelete({_id: userId});
         res.send("user deleted succesfully")
         } catch(err){
           res.status(400).send("Something went wrong")
         }
})

// update the data user deatails
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    

    try{
        const ALLOWED_UPDATES = [
            "userId", "photoUrl", "about", "gender", "age", "skills"
        ]
          
        const isAlowedUpdate = Object.keys(data).every((k) => 
            ALLOWED_UPDATES.includes(k)
        );
        if (!isAlowedUpdate) {
            res.status(400).send("Update not allowed")
        }
       const user = await User.findByIdAndUpdate({_id: userId}, data ,{
            returnDocument: "after",
            runValidators: true,
        });
        console.log(user)
        
        res.send("User Updated Succesfully")

    } catch(err){
        res.status(400).send("update fail:" + err.message)
      }
})






connectDB()
.then(() => {
    console.log("Database connection established....")
    app.listen(3000, () => {
        console.log("server chl ra he iski do bar bara bajau ")
    })
})
.catch((err) => {
    console.log("database is not connected.....")
})

