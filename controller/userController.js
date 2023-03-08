const user = require("../model/user")
const bcrypt = require("bcrypt")

exports.registerUser = async (req, res) => {
    try {
        const { name , password , email , token } = req.body
        
        const bcryptpassword = await bcrypt.hash(password , 10)
        // console.log(bcryptpassword , "password")

        const findUser = await user.findOne({ email : email})

        if (findUser) {
            res.status(400).json({
                status : false,
                message : "User with this email id is already exist"
            })    
            return
        }
        
        const addUser = await user.create({ name : name , password : bcryptpassword , email : email , token : token})
        
        const createtoken = await addUser.createToken()
        
        if (!addUser) {
            
            res.status(400).json({
                status : false,
                error : "Something went wrong while register"
            })
            return
        }
        
        if (addUser && createtoken) {

            const updatetoken = await user.findByIdAndUpdate(addUser._id , {
                token : createtoken
            }, { new : true })
            
            if (!updatetoken) {
                res.status(200).json({
                    status : true,
                    message : " User Is not Registered",
                })
                return
            }

            if (updatetoken) {
                res.status(200).json({
                    status : true,
                    message : "Succesfull User Is Registered",
                    data : updatetoken
                })
                return
            }
            
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({
            status : false,
            error : "unable to register the user"
        })
    }
}

exports.signIn = async (req, res) => {
    try {
        const { email , password } = req.body;

        console.log(password)
        if (!email || !password) {
            res.status(400).json({
                status : false,
                message : "Credential is not provided ..."
            })    
            return
        }

        if (email && password) {
            
            const findUser = await user.findOne({ email : email})

            if (!findUser) {
                res.status(400).json({
                    status : false,
                    message : "User is not register yet..."
                })    
                return
            }

            if (findUser) {

                const passwordMatch = await bcrypt.compare(password, findUser.password )

                console.log(passwordMatch , "password ma")

                if (!passwordMatch) {
                    res.status(400).json({
                        status : false,
                        message : "Password is not valid ... "
                    })    
                    return
                }

                if (passwordMatch) {
                    res.status(200).json({
                        status : true,
                        message : "User Login Succesfully ... ",
                        data : findUser
                    })    
                    return
                }

            }
        }

    } catch (error) {
        res.status(400).json({
            status : false,
            message : "Something went wrong  ... ",
        })    
        return
    }
}

exports.getUserById = async (req, res) => {
    try {
        
        const findUser = await user.findById(req.params.id)

        if (!findUser) {
            res.status(400).json({
                status : false,
                message : "unable to find users  ... ",
            })    
            return
        }

        if (findUser) {

            res.status(200).json({
                status : true,
                message : "User is find By Id  ... ",
                data : findUser
            })    
            return

        }
    } catch (error) {
        res.status(400).json({
            status : false,
            message : "Something went wrong  ... ",
        })    
        return
    }
}

exports.getUserByAuthorization = async (req, res) => {
    try {
        
        if (!req.userId) {
            res.status(400).json({
                status : false,
                message : "User Is Not Authorized  ... ",
            })    
            return
        }

        if (req.userId) {
            res.status(200).json({
                status : true,
                message : "User Detail  ... ",
                data : req.userId
            })    
            return
        }
    } catch (error) {
        res.status(400).json({
            status : false,
            message : "Something went wrong  ... ",
        })    
        return
    }
}

exports.updateUser = async (req, res) => {
    try {

        const { name , password , email , token } = req.body
        const findUser = await user.findById(req.params.id)

        let passwordMatch

        if (password) {
            passwordMatch = await bcrypt.hash(password, 10)
        }

        if (!findUser) {
            res.status(400).json({
                status : false,
                message : "unable to find users with this id  ... ",
            })    
            return
        }

        if (findUser) {
            let updateUser
            if (password) {
                console.log("1")
                updateUser = await user.findByIdAndUpdate(findUser._id , {
                    name , password : passwordMatch , email , token
                }, { new : true })
            }
            
            if (!password) {
                updateUser = await user.findByIdAndUpdate(findUser._id , {
                    name , password , email , token
                }, { new : true })
            }

            if (!updateUser) {
                res.status(400).json({
                    status : true,
                    message : "Update user is find By Id is not done   ... ",
                })    
                return
            }

            if (updateUser) {
                    res.status(200).json({
                        status : true,
                        message : "Succesfull update user is find By Id  ... ",
                        data : updateUser
                    })    
                    return
            }

        }

    } catch (error) {
        res.status(400).json({
            status : false,
            message : "Something went wrong  ... ",
        })    
        return
    }
}

exports.deleteUser = async (req, res) => {
    try {
        
        const findUser = await user.findById(req.params.id)

        if (!findUser) {
            res.status(400).json({
                status : false,
                message : "unable to find users for delete  ... ",
            })    
            return
        }

        if (findUser) {

            const deleteUser = await user.findByIdAndDelete(findUser._id)

            if (!deleteUser) {
                res.status(400).json({
                    status : true,
                    message : "unable to delete user  ... ",
                })    
                return
            }

            if (deleteUser) {
                res.status(200).json({
                    status : true,
                    message : "unable to delete user  ... ",
                    data : deleteUser
                })    
                return
            }


        }

    } catch (error) {
        res.status(400).json({
            status : false,
            message : "Something went wrong  ... ",
        })    
        return
    }
}