const express = require('express');

const router = new express.Router();
const { save } = require('../controllers/schedulerController');

router.post('/save', save);

module.exports = router;
