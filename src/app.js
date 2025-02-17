const express = require('express')
const app = express()
const port = 3000

app.use("/test",(req, res) => {
    res.send("hellobhiya")

})
app.use("/hello",(req, res) => {
    res.send("hellobhijfjhjfdhjghjya")

})

app.listen(port, () => {
    console.log("server chl ra he")
})