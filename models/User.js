const { ObjectID } = require('mongodb')

const { getDatabase } = require('../config/mongodb')



class User{
    
    static dbase() {
        return getDatabase().collection('users')
    }

    static findAll() {
        return this.dbase().find().toArray()
    }

    static findById(id) {
        return this.dbase().findOne({ _id : ObjectID(id)})
    }

    static findByUsername(user) {
        return this.dbase().findOne({ username : user})
    }

    static findByEmail(emailUser) {
        return this.dbase().findOne({ email : emailUser})
    }

    static create(user) {
        return this.dbase().insertOne(user)
    }

    static replace(id, user) {
        return this.dbase().replaceOne({ _id : ObjectID(id)}, user)
    }

    static updateData(id, data) {
        return this.dbase().findOneAndUpdate({ _id : ObjectID(id)}, { $set : data })
    }

    static delete(id) {
        return this.dbase().deleteOne({ _id : ObjectID(id)})
    }

}

module.exports = User