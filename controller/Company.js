const Company = require('../models/Company')
const Akun = require('../models/Akun')
const { pushAccount } = require('../helper/pushAkun')

class CompanyController {
    static async findAll(req, res, next) {
        try {
            const response = await Company.findAll()

            res.status(200).json(response)

        } catch (error) {
            next(error)       
        }
    }

    static async findAllByUser(req, res, next) {
        try {
            const response = await Company.findByUserId(req.userId)

            res.status(200).json(response)

        } catch (error) {
            next(error)       
        }
    }

    static async findById(req, res, next) {
        try {
            const response = await Company.findById(req.params.companyId)
            
            if(response) {
                res.status(200).json(response)
            } else {
                next({ name : 'not found'})
            }
        } catch (error) {
            next(error)
        }
    }


    static async checkManyCompanyUser(req, res, next) {
        try {
            const response = await Company.findByUserId(req.userId)
            if(response.length >= 3) {
                res.status(401).json({
                    error : "create company has reach the maximum limit"
                })
            } else {
                next()
            }
        } catch (error) {
            next(error)
        }
    }

    static async createCompany(req, res , next) {
        const newCompany = {
            name : req.body.name,
            address : req.body.address,
            periodeAwal : req.body.periodeAwal,
            periodeAkhir : req.body.periodeAkhir,
            jenisUsaha : req.body.jenisUsaha,
            noTelp : +req.body.noTelp,
            UserId : req.userId
        }

        try {
            
            const response = await Company.create(newCompany)

            if(response.result.ok) {
                // res.status(201).json(response.ops[0])
                // next()

                let dataCompany = response.ops[0]
                //     CompanyId : response.ops[0]._id,
                //     UserId : response.ops[0].Userid,
                //     jenisUsaha : response.ops[0].jenisUsaha
                // }
                next(dataCompany)
            } else {
                next({ name : 'error insert data'})
            }

        } catch (error) {
            next(error)
        }   
    }

    static async automaticPushAkun(dataCompany, req, res, next) {
        try {
            let getAllDataAccount = pushAccount(dataCompany.UserId, dataCompany._id)

            const response = await Akun.insertAccountByCompany(getAllDataAccount)

            if(response.result.ok) {
                res.status(201).json({
                    company : dataCompany,
                    akun : "success create automatic"
                })
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


    static async automaticDeleteAkuns(req, res, next) {
        try {
            const response = await Akun.deleteAccountByCompany(req.params.companyId)

            if(response.result.n) {
                next({
                    deleteId : req.params.companyId,
                    message : "account automatic delete"
                })
            } else {
                next({ name : 'not found'})
            }
        } catch (error) {
            next(error)
        }
    }


    static async deleteCompany(delAccount , req, res, next) {
        try {
            const response = await Company.delete(delAccount.deleteId)
        
            if(response.result.n) {
                res.status(200).json({
                    company : `Company ${delAccount.deleteId} success delete`,
                    account : delAccount.message
                })
            } else {
                next({ name : 'not found' })
            }
        
        
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CompanyController