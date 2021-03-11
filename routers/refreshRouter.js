const express = require('express');
const auth = require('../middleware/customerAuth');
const router = new express.Router();
router.get('/', auth, async (req, res) => {
  console.log('user', req.user);
  res.send(req.user);
});

module.exports = router;
