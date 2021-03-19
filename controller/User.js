const User = require('../models/User')
const { hashPass, comparePass } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')


// not done still editing

class UserController {
    static async findAllUser(req, res, next) {
        try {
            const response = await User.findAll()

            res.status(200).json(response)

        } catch (error) {
            next(error)       
        }
    }

    static async findUserById(req, res, next) {
        try {
            const response = await User.findById(req.params.userId)

            if(!response) {
                next({ name : 'not found'})
            } else {
                res.status(200).json(response)
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }


    static async registerUser(req, res , next) {

        const newUser = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            username : req.body.username,
            email : req.body.email,
            password : hashPass(req.body.password),
            numberHPUser : +req.body.numberHPUser,
            address : req.body.address
        }

        try {
            
            const response = await User.create(newUser)

            if(response.result.ok) {
                res.status(201).json(response.ops[0])
            } else {
                next({ name : 'error insert data'})
            }

        } catch (error) {
            next(error)
        }   
    }

    static async loginUser(req, res, next) {
        // usermail for checking username or email
        const { usermail, password } = req.body
        
        try {

            let response

            if(usermail.split('@').length == 1) {
                response = await User.findByUsername(usermail)
            } else {
                response = await User.findByEmail(usermail)
            }

            console.log(response)

            if(!response) {
                next({ name : 'not register'})
            } else {
                let checked = comparePass(password, response.password)

                if(!checked) {
                    next({ name : 'not register'})
                } else {
                    const payload = {
                        id : response._id,
                        username : response.username
                    }

                    const access_token = generateToken(payload)

                    res.status(200).json({
                        access_token,
                        id : response._id,
                        username : response.username
                    })
                }

            }
            
        } catch (error) {
            next(error)
        }
    }



    static async updateDataUser(req, res, next) {
        let correctData = {}

        for(const key in req.body) {
            if (key == 'firstName' || key == 'lastName' || key ==  'numberHPUser' || key == 'email' || key == 'address') {
                correctData[key] = req.body[key]
            }
        }

        try {
            if (Object.keys(correctData).length == 0) {
                next({ name : 'error update'})
            }

            const response = await User.updateData(req.params.userId , correctData)

            res.status(200).json({ _id : req.params.userId, ...response})
        } catch (error) {
            next(error)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const response = await User.delete(req.params.userId)
        
            if(response.result.n) {
                res.status(200).json({
                    messages : 'user success delete'
                })
            } else {
                next({ name : 'not found'})
            }
        
        
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController