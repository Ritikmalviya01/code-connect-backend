const express = require('express')
const connectDB = require("./config/database")
const app = express()
const cookieParser = require("cookie-parser")

app.use(cookieParser())
app.use(express.json());


const authRouter = require("./routes/auth");
const profilRouter = require("./routes/profile");
const requestRouter = require("./routes/request");


app.use("/", authRouter);
app.use("/", profilRouter);
app.use("/", requestRouter);







 





connectDB()
.then(() => {
    console.log("Database connection established....")
    app.listen(3000, () => {
        console.log("server chl ra he iski do bar bara bajau ")
    })
})
.catch((err) => {
    console.log("database is not connected.....")
});

