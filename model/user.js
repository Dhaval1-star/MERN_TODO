const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const user = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    token : {
        type : String
    }
})


user.methods.createToken = async function () {

    const token = await jwt.sign({ _id : this._id} , process.env.SECRET_KEY)
    return token
    
}

module.exports = mongoose.model("user" , user)