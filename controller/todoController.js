const todo = require("../model/todo")

exports.addTodo = async (req, res) => {
    try {
        
        const { todos , status } = req.body;

        const addtodo = await todo.create({ user : req.userId._id , todo : todos , status : status })

        if (!addtodo) {
            res.status(400).json({
                status : false,
                error : "Todo is not added ... "
            })
            return
        }
        
        if (addtodo) {
            res.status(200).json({
                status : true,
                message : "Todo is added ... ",
                data : addtodo
            })
            return
            
        }

    } catch (error) {
        // console.log(error)
        res.status(400).json({
            status : false,
            error : "something went wrong while adding todo ... "
        })
        return
    }
}

exports.getAllTodoWithId = async (req, res) => {
    try {
        console.log(req.userId , "userId")
        const findTodos = await todo.find({ user : req.userId._id})

        if (!findTodos) {
            res.status(400).json({
                status : false,
                error : "There is no list with this user id  ... "
            })
            return
        }
        
        if (findTodos) {
            res.status(200).json({
                status : true,
                message : "All todo list is ready ... ",
                data : findTodos
            })
            return
            
        }
    } catch (error) {
        res.status(400).json({
            status : false,
            error : "something went wrong while getting todo List ... "
        })
        return
    }
}

exports.updateTodo = async (req, res) => {
    try {

        const { todos , status } = req.body;

        const findTodos = await todo.findOne({ _id : req.params.id , user : req.userId._id})

        if (!findTodos) {
            res.status(400).json({
                status : false,
                error : "Unable to find todo  ... "
            })
            return
        }
        
        if (findTodos) {

            const updateTodo = await todo.findByIdAndUpdate(req.params.id , {
                todo : todos , status
            } , { new : true })

            if (!updateTodo) {   
                res.status(400).json({
                    status : false,
                    message : "Todo is not updated ... ",
                })
                return
            }

            if (updateTodo) {   
                res.status(200).json({
                    status : true,
                    message : "Todo is updated ... ",
                    data : updateTodo
                })
                return
            }
            
        }
    } catch (error) {
        res.status(400).json({
            status : false,
            message : "Something went wrong while update todo ... ",
        })
        return
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        // here todo id will be given 

        const findTodos = await todo.findById(req.params.id)

        if (!findTodos) {
            res.status(400).json({
                status : false,
                error : "Unable to find todo  ... "
            })
            return
        }
        
        if (findTodos) {

            const deleteTodo = await todo.findByIdAndDelete(req.params.id)

            if (!deleteTodo) {   
                res.status(400).json({
                    status : false,
                    message : "Todo is not deleted ... ",
                })
                return
            }

            if (deleteTodo) {   
                res.status(200).json({
                    status : true,
                    message : "Todo is deleted ... ",
                    data : deleteTodo
                })
                return
            }
            
        }

    } catch (error) {
        res.status(400).json({
            status : false,
            message : "Somethinf went wrong while deleting todo ... ",
        })
        return
    }
}