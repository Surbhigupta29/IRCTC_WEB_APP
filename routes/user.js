const express = require('express');

const authController = require('../controller/auth');
const user = require('../controller/user');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/bookTicket', authController.protect, authController.restrictTo("user"), user.bookTicket);
router.post('/cancelTicket', authController.protect, authController.restrictTo("user"), user.cancelTicket);

module.exports = router;
