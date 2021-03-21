const router = require('express').Router()

const userRoute = require('./user')
const companyRoute = require('./company')
const akunRoute = require('./akun')
const transactionRoute = require('./transaction')

router.get('/', (req, res) => {
    res.status(200).json({ messages : 'server accounting pedia'})
})

router.use('/users', userRoute)
router.use('/companies', companyRoute)
router.use('/akuns', akunRoute)
router.use('/transactions', transactionRoute)
// Transaction
// akun

module.exports = router