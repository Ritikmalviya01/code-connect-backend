const express = require('express')
const connectDB = require("./config/database")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors");
const http = require("http")

require("dotenv").config()

app.use(cors({
    origin: "https://code-connect-frontend-five.vercel.app",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json());


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require('./routes/user');
const initializeSocket = require('./utils/socket');
const chatRouter = require('./routes/chat');


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);


const server = http.createServer(app)

initializeSocket(server)

connectDB()
.then(() => {
    console.log("Database connection established....")
    server.listen(process.env.PORT, () => {
        console.log("server chl ra he iski do bar bara bajau ")
    })
})
.catch((err) => {
    console.log("database is not connected.....")
});


