const { FixedAsset } = require('../models/index')

class FixedAssetController {
    static async findAll(req, res, next) {
        try {
            const response = await FixedAsset.findAll()

            // console.log(response)

            res.status(200).json(response)

        } catch (error) {
            next(error)       
        }
    }

    static async findAllByCompanyUser(req, res, next) {
        try {
            // search akun by company id
            const response = await FixedAsset.findByCompanyId(req.params.fixedAssetId)

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
            const getContact = await FixedAsset.findById(req.params.fixedAssetId)
            
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


    static async createFixedAsset(req, res , next) {
        const newFixedAsset = {
            name : req.body.name,
            noBukti : req.body.noBukti,
            code : req.body.code,
            documentation : req.body.documentation,// photo aset tetap
            category : req.body.category,
            buyDate : req.body.buyDate,
            umurEkonomis : req.body.umurEkonomis,
            nilaiResidu : req.body.nilaiResidu,
            totalCost : +req.body.totalCost,
            methodDepreciation : req.body.methodDepreciation,
            UserId : req.userId,
            CompanyId : req.params.companyId,
            AkunId : req.body.akunId // akun yg berhubungan dengan aset tetap, aset tak berwujud
        }

        try {
            
            const response = await FixedAsset.create(newFixedAsset)

            if(response.result.ok) {
                res.status(201).json(response.ops[0])
            } else {
                next({ name : 'error insert data'})
            }

        } catch (error) {
            next(error)
        }   
    }

    static async updateFA(req, res, next) {
        let correctData = {}

        for(const key in req.body) {
            if (
                key == 'name'   || 
                key == "noBukti" || 
                key == "code" || 
                key == "documentation" || 
                key == "category" ||
                key == "buyDate" ||
                key == "umurEkonomis" || 
                key == "nilaiResidu" ||
                key == "totalCost" ||
                key == "methodDepreciation") {
                correctData[key] = req.body[key]
            }
        }

        try {
            if (Object.keys(correctData).length == 0) {
                next({ name : 'error update' })
            }

            const response = await FixedAsset.updateData(req.params.fixedAssetId , correctData)

            res.status(200).json({ _id : req.params.fixedAssetId, ...response})
        } catch (error) {
            next(error)
        }
    }

    static async deleteFA(req, res, next) {
        try {
            const response = await FixedAsset.delete(req.params.fixedAssetId)
        
            if(response.result.n) {
                res.status(200).json({
                    messages : `Akun ${req.params.fixedAssetId} success delete`
                })
            } else {
                next({ name : 'not found'})
            }
        
        
        } catch (error) {
            next(error)
        }
    }
}


module.exports = FixedAssetController