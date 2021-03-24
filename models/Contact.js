const { ObjectID } = require('mongodb')

const { getDatabase } = require('../config/mongodb')


class Contact{
    
    static dbase() {
        return getDatabase().collection('contacts')
    }

    static findAll() {
        return this.dbase().find().toArray()
    }

    static findAllSuppliers() {
        return this.dbase().find({ type : "supplier"}).toArray()
    }

    static findAllCustomers() {
        return this.dbase().find({ type : "customer"}).toArray()
    }

    static findAllEmployees() {
        return this.dbase().find({ type : "karyawan"}).toArray()
    }

    static findAllByCompany(id) {
        return this.dbase().find({ 
            CompanyId : id,
            COmpanyId : ObjectID(id)
        }).toArray()
    }

    static findById(id) {
        return this.dbase().findOne({ _id : ObjectID(id)})
    }

    static create(contact) {
        return this.dbase().insertOne(contact)
    }

    static replace(id, contact) {
        return this.dbase().replaceOne({ _id : ObjectID(id)}, contact)
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
            COmpanyId : ObjectID(id)
        })
    }
}

module.exports = Contact