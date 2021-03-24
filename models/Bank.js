const { ObjectID } = require('mongodb')

const { getDatabase } = require('../config/mongodb')


class Bank{
    
    static dbase() {
        return getDatabase().collection('banks')
    }

    static findAll() {
        return this.dbase().find().toArray()
    }

    static findByCompanyId(id) {
        return this.dbase().find({ 
            CompanyId : id,
            CompanyId : ObjectID(id)
        }).toArray()
    }

    static findById(id) {
        return this.dbase().findOne({ _id : ObjectID(id)})
    }

    static create(bank) {
        return this.dbase().insertOne(bank)
    }

    static replace(id, bank) {
        return this.dbase().replaceOne({ _id : ObjectID(id)}, bank)
    }

    static updateData(id, data) {
        return this.dbase().findOneAndUpdate({ _id : ObjectID(id)}, { $set : data})
    }

    static delete(id) {
        return this.dbase().deleteOne({ _id : ObjectID(id)})
    }

    static automaticDeleteAll(id) {
        return this.dbase().deleteMany({
            CompanyId : id,
            CompanyId : ObjectID(id)
        })
    }
}

module.exports = Bank