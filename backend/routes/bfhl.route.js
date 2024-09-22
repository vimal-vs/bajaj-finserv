const express = require('express');
const router = express.Router();
const bfhl = require('../controllers/bfhl.controller');

router.get('/', bfhl.getData);
router.post('/', bfhl.postData);

module.exports = router;