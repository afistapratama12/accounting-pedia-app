const router = require('express').Router()
const TransactionController = require('../controller/Transaction')
const { authenticate } = require('../middleware/auth')

router.get('/', TransactionController.findAll)

router.get('/users/companies/akuns/:akunId',authenticate, TransactionController.findAllByUser)
router.get('/:transactionId', TransactionController.findById)

router.post('/', authenticate, TransactionController.createCompany)

router.patch('/:transactionId', authenticate, TransactionController.updateCompany)

router.delete('/:transactionId', authenticate, TransactionController.deleteCompany)

module.exports = router