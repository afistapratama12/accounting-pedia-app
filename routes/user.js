const router = require('express').Router()
const UserController = require('../controller/User')
const { authenticate } = require('../middleware/auth')

router.get('/', UserController.findAllUser)
router.get('/:userId', UserController.findUserById)

router.post('/register', UserController.registerUser)

router.post('/login', UserController.loginUser)

router.patch('/:userId', authenticate, UserController.updateDataUser)

router.delete('/:userId', authenticate, UserController.deleteUser)

module.exports = router