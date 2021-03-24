const router = require('express').Router()
const InventoryController = require('../controller/Inventory')
const { authenticate } = require('../middleware/auth')

router.get('/', InventoryController.findAll)

router.get('/companies/:companyId',authenticate, InventoryController.findAllByCompanyUser)

router.get('/:inventoryId', InventoryController.findById)

router.post('/companies/:companyId', authenticate, InventoryController.createInventory)

router.patch('/:inventoryId', authenticate, InventoryController.updateInventory)

router.delete('/:inventoryId', authenticate, InventoryController.deleteInventory)

module.exports = router