const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const { save } = require('../controllers/withdrawController');
router.post('/save', save);
// router.delete('/delete/:id', deleteComment);
// router.get('/:id', getAllByOwner);

module.exports = router;
