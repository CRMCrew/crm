const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

const { save } = require('../controllers/pdfController.js');

router.post('/save/', save);

module.exports = router;
