const mongoose = require("mongoose");
const express = require("express")

const connectDB = async () => {

    await mongoose.connect("mongodb+srv://ritikmalviya40:ua0R5k2001eLbieN@node.bnql2.mongodb.net/DevTinder")

}
module.exports = connectDB;


