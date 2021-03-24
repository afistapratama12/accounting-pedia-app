const router = require('express').Router()
const ContactController = require('../controller/Contact')
const { authenticate } = require('../middleware/auth')

router.get('/', ContactController.findAll)

router.get('/companies/:companyId',authenticate, ContactController.findAllByCompanyUser)

router.get('/:contactId', ContactController.findById)

router.post('/companies/:companyId', authenticate, ContactController.createContact)

router.patch('/:contactId', authenticate, ContactController.updateContact)

router.delete('/:contactId', authenticate, ContactController.deleteContact)

module.exports = router