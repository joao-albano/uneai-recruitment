const express = require('express');
const { getDashboardOverview } = require('../controllers/dashboard.controller');

const router = express.Router();

// GET /api/dashboard/overview
router.get('/overview', getDashboardOverview);

module.exports = router; 
 
 
 