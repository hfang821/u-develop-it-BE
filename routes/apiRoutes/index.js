//this file serves as a central hub to pull all routes together 
const express = require('express');
const router = express.Router();

router.use(require('./candidateRoutes'));

module.exports = router;