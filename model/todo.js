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
    },
    start_date : {
        type : String
    },
    end_date : {
        type : String
    }
})

module.exports = mongoose.model("todo" , todos)