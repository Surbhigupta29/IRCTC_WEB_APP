const express = require('express');
const authController = require('../controller/auth');
const train = require('../controller/train');

const router = express.Router();

router.get('/', train.getAllTrains);
router.post('/', authController.protect, authController.restrictTo("admin"), train.createTrain);
router.put('/:trainId', authController.protect, authController.restrictTo("admin"), train.updateTrain);
router.delete('/:trainId', authController.protect, authController.restrictTo("admin"), train.deleteTrain);

// router.route('/').get(train.getAllTrains).post(train.createTrain);
//router.route('/:trainId').put(train.updateTrain).delete(train.deleteTrain);

module.exports = router;
