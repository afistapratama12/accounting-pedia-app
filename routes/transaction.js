const router = require('express').Router()
const TransactionController = require('../controller/Transaction')
const { authenticate } = require('../middleware/auth')

router.get('/', TransactionController.findAll)

router.get('/companies/:companyId/akuns/:akunId',authenticate, TransactionController.findAllByAkun)

router.get('/companies/:companyId',authenticate, TransactionController.findAllByCompanyUser)
router.get('/:transactionId', TransactionController.findById)

router.post('/companies/:companyId', authenticate, TransactionController.createTransaction)

router.patch('/:transactionId', authenticate, TransactionController.updateTransaction)

router.delete('/:transactionId', authenticate, TransactionController.deleteTransaction)

module.exports = router