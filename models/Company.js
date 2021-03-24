const { ObjectID } = require('mongodb')

const { getDatabase } = require('../config/mongodb')



class Company{
    
    static dbase() {
        return getDatabase().collection('companies')
    }

    static findAll() {
        return this.dbase().find().toArray()
    }

    static findByUserId(id) {
        return this.dbase().find({ UserId : id}).toArray()
    }

    static findById(id) {
        return this.dbase().findOne({ _id : ObjectID(id)})
    }

    static create(user) {
        return this.dbase().insertOne(user)
    }

    static replace(id, company) {
        return this.dbase().replaceOne({ _id : ObjectID(id)}, company)
    }

    static updateData(id, data) {
        return this.dbase().findOneAndUpdate({ _id : ObjectID(id)}, { $set : data})
    }

    static delete(id) {
        return this.dbase().deleteOne({ 
            _id : ObjectID(id)
        })
    }

}

module.exports = Company