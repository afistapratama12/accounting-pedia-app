const router = require('express').Router()
const CompanyController = require('../controller/Company')
const { authenticate } = require('../middleware/auth')

router.get('/', CompanyController.findAll)

router.get('/users',authenticate, CompanyController.findAllByUser)
router.get('/:companyId', CompanyController.findById)

router.post('/', authenticate,CompanyController.checkManyCompanyUser, CompanyController.createCompany, CompanyController.automaticPushAkun)

router.patch('/:companyId', authenticate, CompanyController.updateCompany)


// edit automatic delete bank, inv, contact, fixed asset
router.delete('/:companyId', authenticate, CompanyController.automaticDeleteTransaction ,CompanyController.automaticDeleteAkuns, CompanyController.deleteCompany)

module.exports = router