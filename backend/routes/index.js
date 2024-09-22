const express = require('express');
const router = express.Router();

const bfhlRoutes = require('./bfhl.route');

router.use('/bfhl', bfhlRoutes);

module.exports = router;