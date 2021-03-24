const router = require('express').Router()
const BankController = require('../controller/Bank')
const { authenticate } = require('../middleware/auth')

router.get('/', BankController.findAll)

router.get('/companies/:companyId',authenticate, BankController.findAllByCompanyUser)

router.get('/:bankId', BankController.findById)

router.post('/companies/:companyId', authenticate, BankController.createBank)

router.patch('/:bankId', authenticate, BankController.updateBank)

router.delete('/:bankId', authenticate, BankController.deleteBank)

module.exports = router