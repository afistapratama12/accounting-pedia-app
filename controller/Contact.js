const { Contact } = require('../models/index')

class ContactController {
    static async findAll(req, res, next) {
        try {
            const response = await Contact.findAll()

            // console.log(response)

            res.status(200).json(response)

        } catch (error) {
            next(error)       
        }
    }

    static async findAllByCompanyUser(req, res, next) {
        try {
            // search akun by company id
            const response = await Contact.findByCompanyId(req.params.companyId)

            // const getTransaction = await Transaction.findAll(req.params.companyId)

            // console.log(response)
            if(response.length == 0) {
                next({ name : 'not found'})
            } else {
                
                // const result = showAllAkunWithTransaction(response, getTransaction)                
                res.status(200).json(response)
            }

        } catch (error) {
            next(error)       
        }
    }

    static async findById(req, res, next) {
        try {
            const getContact = await Contact.findById(req.params.contactId)
            
            // const getTransaction = await Transaction.findAll(req.params.companyId)

            if(getContact) {
                // let getAllTrans = allTransactionAkun(getAkun, getTransaction)
                res.status(200).json(getContact)
            } else {
                next({ name : 'not found'})
            }
        } catch (error) {
            next(error)
        }
    }


    static async createContact(req, res , next) {
        const newContact = {
            name : req.body.contactName,
            code : req.body.contactCode,
            email : req.body.contactEmail,
            numberHP : req.body.numberHP,
            type : req.body.type,
            createdAt : req.body.createdAt,
            saldo : 0,
            debet : 0,
            kredit : 0,
            UserId : req.userId,
            CompanyId : req.params.companyId,
            AkunId : req.body.akunId // akun yg berhubungan dengan contact, piutang, hutang, hutang karyawan, dll
        }

        try {
            
            const response = await Contact.create(newContact)

            if(response.result.ok) {
                res.status(201).json(response.ops[0])
            } else {
                next({ name : 'error insert data'})
            }

        } catch (error) {
            next(error)
        }   
    }

    static async updateContact(req, res, next) {
        let correctData = {}

        for(const key in req.body) {
            if (
                key == 'name'   || 
                key == "code" || 
                key == "email" || 
                key == "numberHP" || 
                key == "debet" ||
                key == "kredit" ) {
                correctData[key] = req.body[key]
            }
        }

        try {
            if (Object.keys(correctData).length == 0) {
                next({ name : 'error update' })
            }

            const response = await Contact.updateData(req.params.contactId , correctData)

            res.status(200).json({ _id : req.params.contactId, ...response})
        } catch (error) {
            next(error)
        }
    }

    static async deleteContact(req, res, next) {
        try {
            const response = await Contact.delete(req.params.contactId)
        
            if(response.result.n) {
                res.status(200).json({
                    messages : `Akun ${req.params.contactId} success delete`
                })
            } else {
                next({ name : 'not found'})
            }
        
        
        } catch (error) {
            next(error)
        }
    }
}


module.exports = ContactController