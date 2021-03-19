const router = require('express').Router()

const userRoute = require('./user')
const companyRoute = require('./company')
const akunRoute = require('./akun')

router.get('/', (req, res) => {
    res.status(200).json({ messages : 'server accounting pedia'})
})

router.use('/users', userRoute)
router.use('/companies', companyRoute)
router.use('/akuns', akunRoute)
// Transaction
// akun

module.exports = router