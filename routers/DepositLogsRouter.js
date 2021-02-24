const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

const {
  saveDepositLogs,
  getByCusomer,
} = require('../controllers/depositLogsController');
router.post('/save', saveDepositLogs);
router.get('/get-by-customer/:id', getByCusomer);

module.exports = router;
