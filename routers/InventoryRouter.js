const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

const {
  saveInventory,

  getInventoryGroups,
  updateGroup,
  deleteGroup,
  updateInventoryItems,
} = require('../controllers/InventoryController');

router.post('/save/', saveInventory);

router.get('/get-groups', getInventoryGroups);
router.get('/delete-group/:id', deleteGroup);
router.patch('/update-group/:id', updateGroup);
router.patch('/update-inventory-items/:id', updateInventoryItems);
module.exports = router;
