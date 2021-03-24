const {
    Bank, 
    Transaction 
} = require('../models/index')

class BankController {
    static async findAll(req, res, next) {
        try {
            const response = await Bank.findAll()

            // console.log(response)

            res.status(200).json(response)

        } catch (error) {
            next(error)       
        }
    }

    static async findAllByCompanyUser(req, res, next) {
        try {
            // search akun by company id
            const response = await Bank.findByCompanyId(req.params.companyId)

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
            const getBank = await Bank.findById(req.params.bankId)
            
            // const getTransaction = await Transaction.findAll(req.params.companyId)

            if(getBank) {
                // let getAllTrans = allTransactionAkun(getAkun, getTransaction)
                res.status(200).json(getBank)
            } else {
                next({ name : 'not found'})
            }
        } catch (error) {
            next(error)
        }
    }


    static async createBank(req, res , next) {
        const newBank = {
            bankName : req.body.bankName,
            bankBranch : req.body.bankBranch,
            bankAddress : req.body.bankAddress,
            noRekening : req.body.noRekening,
            nameOwner : req.body.nameOwner,
            saldo : 0,
            swiftCode : req.body.swiftCode,
            UserId : req.userId,
            CompanyId : req.params.companyId,
            AkunId : req.body.akunId // akun yg berhubungan dengan bank
        }

        try {
            
            const response = await Bank.create(newBank)

            if(response.result.ok) {
                res.status(201).json(response.ops[0])
            } else {
                next({ name : 'error insert data'})
            }

        } catch (error) {
            next(error)
        }   
    }

    static async updateBank(req, res, next) {
        let correctData = {}

        for(const key in req.body) {
            if (
                key == 'bankName'   || 
                key == "bankBranch" || 
                key == "bankAddress" || 
                key == "noRekening" || 
                key == "nameOwner" || 
                key == "saldo" || 
                key == "swiftCode") {
                correctData[key] = req.body[key]
            }
        }

        try {
            if (Object.keys(correctData).length == 0) {
                next({ name : 'error update' })
            }

            const response = await Bank.updateData(req.params.bankId , correctData)

            res.status(200).json({ _id : req.params.bankId, ...response})
        } catch (error) {
            next(error)
        }
    }

    static async deleteBank(req, res, next) {
        try {
            const response = await Bank.delete(req.params.bankId)
        
            if(response.result.n) {
                res.status(200).json({
                    messages : `Akun ${req.params.bankId} success delete`
                })
            } else {
                next({ name : 'not found'})
            }
        
        
        } catch (error) {
            next(error)
        }
    }
}


module.exports = BankController