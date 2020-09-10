const express = require('express');

const authController = require('../controller/auth');
const usersBookingHistory = require('../controller/usersBookingHistory');

const router = express.Router();

router.get('/', authController.protect, authController.restrictTo("user"), usersBookingHistory.getUserBookingHistory);

module.exports = router;