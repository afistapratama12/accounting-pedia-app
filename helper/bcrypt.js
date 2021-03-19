const bcrypt = require('bcryptjs')


function hashPass(password){
    let salt = bcrypt.genSaltSync(4)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function comparePass(password, dbPass){
    return bcrypt.compareSync(password, dbPass)
}

module.exports = {
    hashPass,
    comparePass
}