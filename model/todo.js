const mongoose = require("mongoose")

const todos = mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : "user"
    },
    todo : {
        type : String,
    },
    status : {
        type : String,
        enum : ["Pending" , "Completed"]
    }
})

module.exports = mongoose.model("todo" , todos)