//this file serves as a central hub to pull all routes together 
const express = require('express');
const router = express.Router();

router.use(require('./candidateRoutes'));
router.use(require('./voterRoutes'));
router.use(require('./voteRoutes'));

module.exports = router;