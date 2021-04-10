const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

const { getResponse } = require('../controllers/CreditcardDepositController');

router.post('/', getResponse);

module.exports = router;
