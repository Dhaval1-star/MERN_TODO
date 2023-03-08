const express = require("express")
const route = express.Router()
const todoController = require("../controller/todoController")
let { AuthorizeUser } = require("../middleware/Authorization")

route.post("/add/todo" , AuthorizeUser , todoController.addTodo)

route.get("/get/todo" , AuthorizeUser , todoController.getAllTodoWithId)

route.put("/update/todo/:id" , AuthorizeUser , todoController.updateTodo)

route.delete("/delete/todo/:id" , todoController.deleteTodo)

module.exports = route