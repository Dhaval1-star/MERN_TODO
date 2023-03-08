const user = require("../model/user")
const jwt = require("jsonwebtoken")

exports.AuthorizeUser = async (req, res , next) => {
    try {
        const token = req.headers.authorization
        console.log(token , "token")
        const verifytoken = await jwt.verify(token , process.env.SECRET_KEY)

        const findUserWithId = await user.findById(verifytoken._id)

        req.userId = findUserWithId
        
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status : false,
            error : "User is not authorize"
        })
    }
}