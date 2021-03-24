const router = require('express').Router()
const AkunController = require('../controller/Akun')
const { authenticate } = require('../middleware/auth')

// perlu perbaikan 

router.get('/', AkunController.findAll)

router.get('/companies/:companyId',authenticate, AkunController.findAllByCompanyUser)

//get all with transaction
router.get('/:akunId/companies/:companyId', AkunController.findById) 

router.post('/companies/:companyId', authenticate, AkunController.createAkun)

router.patch('/:akunId', authenticate, AkunController.updateAkun) // belom dites

router.delete('/:akunId', authenticate, AkunController.deleteAkun) // belom dites

router.delete("/manual/:manual", authenticate, AkunController.deleteManual)

module.exports = router