const userController = require("../controller/userController")
const express = require("express")
const route = express.Router()
let { AuthorizeUser } = require("../middleware/Authorization")


route.post("/register" , userController.registerUser)

route.post("/signIn" , userController.signIn)

route.get("/getUserById/:id" , userController.getUserById)

route.get("/getUserByAuthorize" , AuthorizeUser , userController.getUserByAuthorization)

route.put("/updateUser/:id" , userController.updateUser)

route.delete("/deleteuser/:id" , userController.deleteUser)

module.exports = route