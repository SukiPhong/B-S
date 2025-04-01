const express = require('express');
const router = express.Router();
const Analytics = require('../controllers/analytics ');
const verify = require("../middleware/verify_Token");
router.use(verify.verifyToken,verify.verifyTokenAdmin)
router.get('/revenue',  Analytics.getRevenue);
router.get('/dashboard', Analytics.getDashboardStats);

module.exports = router;