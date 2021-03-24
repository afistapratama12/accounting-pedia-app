const Akun = require('../models/Akun')

const { 
    allTransactionAkun, 
    showAllAkunWithTransaction 
} = require('../helper/allTransactionByAkun')

const Transaction = require('../models/Transaction')

class AkunController {
    static async findAll(req, res, next) {
        try {
            const response = await Akun.findAll()

            // console.log(response)

            res.status(200).json(response)

        } catch (error) {
            next(error)       
        }
    }

    static async findAllByCompanyUser(req, res, next) {
        try {
            // search akun by company id
            console.log("masuk sini donk") // masih error donk
            const response = await Akun.findByCompanyUser(req.params.companyId)

            const getTransaction = await Transaction.findAll(req.params.companyId)

            // console.log(response)
            if(response.length == 0) {
                next({ name : 'not found'})
            } else {
                
                const result = showAllAkunWithTransaction(response, getTransaction)                

                res.status(200).json(result)
            }

        } catch (error) {
            next(error)       
        }
    }


    static async findById(req, res, next) {
        try {
            const getAkun = await Akun.findById(req.params.akunId)
            
            const getTransaction = await Transaction.findAll(req.params.companyId)

            if(getAkun) {

                let getAllTrans = allTransactionAkun(getAkun, getTransaction)
                res.status(200).json(getAllTrans)
            } else {
                next({ name : 'not found'})
            }
        } catch (error) {
            next(error)
        }
    }


    static async createAkun(req, res , next) {
        const newAkun = {
            AccNumber : +req.body.accNumber,
            AccName : req.body.accName,
            Head : req.body.head,
            Category : req.body.category,
            subCategory : req.body.subCategory,
            saldo : 0,
            debet : 0,
            kredit : 0,
            position : req.body.position,
            UserId : req.userId,
            CompanyId : req.params.companyId
        }

        try {
            
            const response = await Akun.create(newAkun)

            if(response.result.ok) {
                res.status(201).json(response.ops[0])
            } else {
                next({ name : 'error insert data'})
            }

        } catch (error) {
            next(error)
        }   
    }


    // cuma bisa update nama Akun
    static async updateAkun(req, res, next) {
        let correctData = {}

        for(const key in req.body) {
            if (key == 'accName') {
                correctData[key] = req.body[key]
            }
        }

        try {
            if (Object.keys(correctData).length == 0) {
                next({ name : 'error update' })
            }

            const response = await Akun.updateData(req.params.akunId , correctData)

            res.status(200).json({ _id : req.params.userId, ...response})
        } catch (error) {
            next(error)
        }
    }

    static async deleteAkun(req, res, next) {
        try {
            const response = await Akun.delete(req.params.akunId)
        
            if(response.result.n) {
                res.status(200).json({
                    messages : `Akun ${req.params.akunId} success delete`
                })
            } else {
                next({ name : 'not found'})
            }
        
        
        } catch (error) {
            next(error)
        }
    }


    static async deleteManual (req, res, next) { 
        try {
            
            const response = await Akun.manualDelete(req.params.manual)

            if(response) {
                console.log(response)
                res.status(200).json({ messages : `delete akun by Head ${req.params.manual}`})
            } else {
                next( { name : "not found"})
            }

        } catch (error) {
            next(error)
        }   
    }
}

module.exports = AkunController