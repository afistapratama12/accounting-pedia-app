const jwt = require('jsonwebtoken')
const secretKey = "rahasia"

function generateToken(payload){
    let token = jwt.sign(payload, secretKey)
    return token
}

function checkToken(token){
    return jwt.verify(token, secretKey)
}

module.exports ={
    generateToken,
    checkToken
}