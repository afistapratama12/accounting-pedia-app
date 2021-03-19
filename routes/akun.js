const router = require('express').Router()
const AkunController = require('../controller/Akun')
const { authenticate } = require('../middleware/auth')

// perlu perbaikan 

router.get('/', AkunController.findAll)

router.get('/companies/:companyId',authenticate, AkunController.findAllByCompanyUser)
router.get('/:akunId', AkunController.findById)

router.post('/', authenticate, AkunController.createCompany)

router.patch('/:akunId', authenticate, AkunController.updateCompany)

router.delete('/:akunId', authenticate, AkunController.deleteCompany)

module.exports = router