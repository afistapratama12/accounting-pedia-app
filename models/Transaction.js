const { ObjectID } = require('mongodb')

const { getDatabase } = require('../config/mongodb')


class Transaction{
    
    static dbase() {
        return getDatabase().collection('transactions')
    }

    static findAll() {
        return this.dbase().find().toArray()
    }

    static findById(id) {
        return this.dbase().findOne({ _id : ObjectID(id)})
    }

    static findByCompanyId(id) {
        return this.dbase().find({
            CompanyId : ObjectID(id),
            CompanyId : id
        }).toArray()
    }

    static findByAkunId(id) {
        return this.dbase().find({
            AkunId : ObjectID(id),
            AkunId : id
        }).toArray()
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
        return this.dbase().deleteOne({ _id : ObjectID(id)})
    }

    static automaticDeleteByCompanyId(id) {
        return this.dbase().deleteMany({
            CompanyId : ObjectID(id),
            CompanyId : id
        })
    }

}

module.exports = Transaction