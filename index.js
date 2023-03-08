const express = require("express")
const app = express()
const coookieParser = require("cookie-parser")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()

app.use(cors())
const db = require("./database/db")
const port = process.env.PORT || 5000

app.use(express.json())
app.use(coookieParser())

const userRoute = require("./Route/userRoute")
const todoRoute = require("./Route/todoRoute")

app.use("/api/v1" , userRoute)
app.use("/api/v1" , todoRoute)

app.get("/dhaval" , (req, res) => {
    res.status(200).json({message : "hello world this is backend of todo"})
})

app.listen(port , () => {
    console.log(`Example app listening on port ${port}`)
})