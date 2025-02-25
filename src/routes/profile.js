const express = require("express");
const {userAuth} = require("../middlewares/auth")

const profilRouter = express.Router();


profilRouter.get("/profile", userAuth, async(req, res) => {
    try {
        
       const user = req.user;
    
        res.send(user)
    } catch (err){
        res.status(400).send("Error:" + err.message)
         }
    });

module.exports = profilRouter;