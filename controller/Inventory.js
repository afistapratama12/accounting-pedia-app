const { Inventory } = require('../models/index')

const { showTotalInventory } = require('../helper/totalInventory')

class InventoryController {
    static async findAll(req, res, next) {
        try {
            const response = await Inventory.findAll()

            const withTotal = showTotalInventory(response)

            res.status(200).json(withTotal)
    
        } catch (error) {
            next(error)       
        }
    }

    static async findAllByCompanyUser(req, res, next) {
        try {
            // search akun by company id
            const response = await Inventory.findByCompanyId(req.params.companyId)

           
            // const getTransaction = await Transaction.findAll(req.params.companyId)

            // console.log(response)
            if(response.length == 0) {
                next({ name : 'not found'})
            } else {
                // const result = showAllAkunWithTransaction(response, getTransaction)                
                const withTotal = showTotalInventory(response)
                res.status(200).json(withTotal)
            }

        } catch (error) {
            next(error)       
        }
    }


    static async findById(req, res, next) {
        try {
            const getInventory = await Inventory.findById(req.params.inventoryId)
            
            
            // const getTransaction = await Transaction.findAll(req.params.companyId)

            if(getInventory) {
                // let getAllTrans = allTransactionAkun(getAkun, getTransaction)
                res.status(200).json(getInventory)
            } else {
                next({ name : 'not found'})
            }
        } catch (error) {
            next(error)
        }
    }


    static async createInventory(req, res , next) {
        const newInventory = {
            name : req.body.name,
            code : req.body.code,
            noBukti : req.body.noBukti,
            stock : +req.body.stock,
            unitPrice : +req.body.unitPrice, 
            category : req.body.category,
            UserId : req.userId,
            CompanyId : req.params.companyId,
            AkunId : req.body.akunId // akun yg berhubungan dengan contact, piutang, hutang, hutang karyawan, dll
        }

        try {
            
            const response = await Inventory.create(newInventory)

            if(response.result.ok) {
                res.status(201).json(response.ops[0])
            } else {
                next({ name : 'error insert data'})
            }

        } catch (error) {
            next(error)
        }   
    }

    static async updateInventory(req, res, next) {
        let correctData = {}

        for(const key in req.body) {
            if (
                key == 'name'   || 
                key == "code" || 
                key == "noBukti" || 
                key == "stock" || 
                key == "unitPrice" ||
                key == "category" ) {
                correctData[key] = req.body[key]
            }
        }

        try {
            if (Object.keys(correctData).length == 0) {
                next({ name : 'error update' })
            }

            const response = await Inventory.updateData(req.params.inventoryId , correctData)

            res.status(200).json({ _id : req.params.inventoryId, ...response})
        } catch (error) {
            next(error)
        }
    }

    static async deleteInventory(req, res, next) {
        try {
            const response = await Inventory.delete(req.params.inventoryId)
        
            if(response.result.n) {
                res.status(200).json({
                    messages : `Akun ${req.params.inventoryId} success delete`
                })
            } else {
                next({ name : 'not found'})
            }
        
        
        } catch (error) {
            next(error)
        }
    }
}


module.exports = InventoryController