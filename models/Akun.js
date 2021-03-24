const { ObjectID } = require('mongodb')

const { getDatabase } = require('../config/mongodb')


class Akun{
    
    static dbase() {
        return getDatabase().collection("akuns")
    }

    static findAll() {
        return this.dbase().find().toArray()
    }

    static findByCompanyUser(id) {
        return this.dbase().find({
            CompanyId : ObjectID(id)
        }).toArray()
    }

    static findById(id) {
        return this.dbase().findOne({ _id : ObjectID(id)})
    }


    static insertAccountByCompany(insertData) {
        return this.dbase().insert(insertData)
    }

    static create(user) {
        return this.dbase().insertOne(user)
    }

    static replace(id, company) {
        return this.dbase().replaceOne({ _id : ObjectID(id)}, company)
    }

    static updateData(id, data) {
        return this.dbase().findOneAndUpdate({ 
            _id : ObjectID(id)
        }, { $set : data}
        )
    }

    static delete(id) {
        return this.dbase().deleteOne({ _id : ObjectID(id)})
    }

    static deleteAccountByCompany(id) {
        return this.dbase().deleteMany({ 
            CompanyId : ObjectID(id)
        })
    }

    static manualDelete(val) {
        return this.dbase().deleteMany({ Head : val })
    }
}

module.exports = Akun