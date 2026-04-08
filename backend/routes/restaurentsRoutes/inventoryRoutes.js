const express = require('express');
const router = express.Router();
const { addInventory, getInventory, updateInventory, deleteInventory, deleteAllInventory } = require('../../controllers/restaurentsControllers/inventoryController');
const { protect } = require('../../middleware/verifyUser');

router.post('/', protect, addInventory);
router.get('/', protect, getInventory);
router.delete('/delete-all', protect, deleteAllInventory);
router.put('/:id', protect, updateInventory);
router.delete('/:id', protect, deleteInventory);

module.exports = router;