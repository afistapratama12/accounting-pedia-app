const router = require('express').Router()

const userRoute = require('./user')
const companyRoute = require('./company')
const akunRoute = require('./akun')
const transactionRoute = require('./transaction')
const contactRoute = require('./contact')
const fixedAssetRoute = require('./fixedAsset')
const inventoryRoute = require('./inventory')
const bankRoute = require('./bank')

router.get('/', (req, res) => {
    res.status(200).json({ messages : 'server accounting pedia' })
})

router.use('/users', userRoute)
router.use('/companies', companyRoute)
router.use('/akuns', akunRoute)
router.use('/transactions', transactionRoute)
router.use('/contacts',contactRoute)
router.use('/fixed_assets', fixedAssetRoute)
router.use('/inventories', inventoryRoute)
router.use('/banks', bankRoute)


module.exports = router