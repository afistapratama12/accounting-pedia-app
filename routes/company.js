const router = require('express').Router()
const CompanyController = require('../controller/Company')
const { authenticate } = require('../middleware/auth')

router.get('/', CompanyController.findAll)

router.get('/users',authenticate, CompanyController.findAllByUser)
router.get('/:companyId', CompanyController.findById)

router.post('/', authenticate, CompanyController.createCompany, CompanyController.automaticPushAkun)

router.patch('/:companyId', authenticate, CompanyController.updateCompany)

router.delete('/:companyId', authenticate, CompanyController.deleteCompany)

module.exports = router