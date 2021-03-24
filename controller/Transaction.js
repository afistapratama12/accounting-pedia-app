const { Transaction } = require('../models/index')

// diperbaiki dulu
class TransactionController{
    static async findAll(req, res, next) {
        try {
            const response = await Transaction.findAll()

            // console.log(response)

            res.status(200).json(response)

        } catch (error) {
            next(error)       
        }
    }

    static async findAllByCompanyUser(req, res, next) {
        try {
            const response = await Transaction.findByCompanyId(req.params.companyId)

            if(response.length == 0) {
                next({ name : "not found"})
            }

            res.status(200).json(response)

        } catch (error) {
            next(error)       
        }
    }

    static async findAllByAkun(req, res, next) {
        try {
            const response = await Transaction.findByAkunId(req.params.akunId)

            // console.log(response)
            if(response.length == 0) {
                next({ name : "not found"})
            }
            res.status(200).json(response)

        } catch (error) {
            next(error)       
        }
    }



    static async findById(req, res, next) {
        try {
            const response = await Transaction.findById(req.params.transactionId)
            
            if(response) {
                res.status(200).json(response)
            } else {
                next({ name : 'not found'})
            }
        } catch (error) {
            next(error)
        }
    }


    static async createTransaction(req, res , next) {
        try {
            const newTransaction = {
                name : req.body.name,
                noBukti : req.body.noBukti,
                createdAt : req.body.createdAt,
                documantation : req.body.documentation,
                UserId : req.userId,
                CompanyId : req.params.companyId,
                ContactId : req.body.contactId,
                InventoryId : req.body.inventoryId,
                FixedAssetId : req.body.fixedAssetId,
                BankId : req.body.bankId,
                mutations : req.body.mutations
            }

            if(!Array.isArray(req.body.mutations) || !newTransaction.CompanyId || newTransaction.CompanyId.length < 5) {
                next({ name : 'error insert data'})

            } else {

                // console.log(req.params.companyId, "get dari params")

                // console.log(newTransaction.CompanyId, "get dari new transaction")

                // res.status(200).json({
                //     getparams : req.params.companyId
                // })

                const response = await Transaction.create(newTransaction)
    
                if(response.result.ok) {
                    res.status(201).json(response.ops[0])
                } else {
                    next({ name : 'error insert data'})
                }
            }
        } catch (error) {
            next(error)
        }   
    }



    static async updateTransaction(req, res, next) {
        let correctData = {}

        for(const key in req.body) {
            if (key == 'name' || key == "noBukti" || key == "documentation") {
                correctData[key] = req.body[key]
            }
        }

        try {
            if (Object.keys(correctData).length == 0) {
                next({ name : 'error update'})
            }

            const response = await Transaction.updateData(req.params.transactionId , correctData)

            res.status(200).json({ _id : req.params.transactionId, ...response})
        } catch (error) {
            next(error)
        }
    }

    static async deleteTransaction(req, res, next) {
        try {
            const response = await Transaction.delete(req.params.transactionId)
        
            if(response.result.n) {
                res.status(200).json({
                    messages : `transaction ${req.params.transactionId} success delete`
                })
            } else {
                next({ name : 'not found'})
            }
        
        } catch (error) {
            next(error)
        }
    }
}


module.exports = TransactionController