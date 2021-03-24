const router = require('express').Router()
const FixedAssetController = require('../controller/FIxedAsset')
const { authenticate } = require('../middleware/auth')

router.get('/', FixedAssetController.findAll)

router.get('/companies/:companyId',authenticate, FixedAssetController.findAllByCompanyUser)

router.get('/:fixedAssetId', FixedAssetController.findById)

router.post('/companies/:companyId', authenticate, FixedAssetController.createFixedAsset)

router.patch('/:fixedAssetId', authenticate, FixedAssetController.updateFA)

router.delete('/:fixedAssetId', authenticate, FixedAssetController.deleteFA)

module.exports = router