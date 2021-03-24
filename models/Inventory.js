const { ObjectID } = require('mongodb')

const { getDatabase } = require('../config/mongodb')


class Inventory{
    
    static dbase() {
        return getDatabase().collection('inventories')
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

    static create(inventory) {
        return this.dbase().insertOne(inventory)
    }

    static replace(id, inventory) {
        return this.dbase().replaceOne({ _id : ObjectID(id)}, inventory)
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

module.exports = Inventory