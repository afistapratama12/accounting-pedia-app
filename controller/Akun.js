const Akun = require('../models/Akun')

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

            // console.log(response)

            res.status(200).json(response)

        } catch (error) {
            next(error)       
        }
    }

    static async findById(req, res, next) {
        try {
            const response = await Akun.findById(req.params.akunId)
            
            if(response) {
                res.status(200).json(response)
            } else {
                next({ name : 'not found'})
            }
        } catch (error) {
            next(error)
        }
    }


    static async createCompany(req, res , next) {
        const newCompany = {
            AccNumber : +req.body.accNumber,
            AccName : req.body.accName,
            Head : req.body.head,
            Category : req.body.category,
            subCategory : +req.body.subCategory,
            saldo : +req.body.saldo,
            debet : +req.body.debet,
            kredit : +req.body.kredit,
            position : req.body.position,
            UserId : req.userId,
            CompanyId : req.body.companyId
        }

        try {
            
            const response = await Company.create(newCompany)

            if(response.result.ok) {
                res.status(201).json(response.ops[0])
            } else {
                next({ name : 'error insert data'})
            }

        } catch (error) {
            next(error)
        }   
    }



    static async updateCompany(req, res, next) {
        let correctData = {}

        for(const key in req.body) {
            if (key == 'name' || key == 'address' || key ==  'noTelp') {
                correctData[key] = req.body[key]
            }
        }

        try {
            if (Object.keys(correctData).length == 0) {
                next({ name : 'error update'})
            }

            const response = await Company.updateData(req.params.companyId , correctData)

            res.status(200).json({ _id : req.params.userId, ...response})
        } catch (error) {
            next(error)
        }
    }

    static async deleteCompany(req, res, next) {
        try {
            const response = await Company.delete(req.params.companyId)
        
            if(response.result.n) {
                res.status(200).json({
                    messages : 'user success delete'
                })
            } else {
                next({ name : 'not found'})
            }
        
        
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AkunController