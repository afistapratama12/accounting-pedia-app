const { checkToken } = require("../helper/jwt");

const User = require('../models/User')

//auth for checking login user or not
async function authenticate (req, res, next) {
    try {

        let decoded = checkToken(req.headers.access_token)

        let dataUser = await User.findById(decoded.id)

        if(!dataUser) {
            next({ name : 'login first'})
        } else {
            req.userId = dataUser._id
            // console.log(decoded)
            // console.log(req.userId)
            next()
        }
    } catch (error) {
        next(error)
    }
}

// auth to get local item company id search for Akun
async function authForCompany (req, res, next) {
    try {

    } catch (error) {
        
    }
}

// auth to get local item akun id search for transaction
async function authForCompany (req, res, next) {
    try {

    } catch (error) {
        
    }
}


module.exports = {
    authenticate
}