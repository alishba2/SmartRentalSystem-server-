const express = require('express');
const router = express.Router();
const installmentController = require("../Controllers/installmentController");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure storage as needed

// Create Installment
router.post('/addInstallment', installmentController.createInstallment);

// Get Installments by Rental ID
router.get('/installments/:rentalId', installmentController.getInstallmentsByRentalId);

// Pay an Installment
router.put('/installments/:rentalId/:installmentNo', upload.single('receipt'), installmentController.payInstallment);

// Verify an Installment
router.put('/verifyInstallment/:rentalId/:installmentNo', installmentController.verifyInstallment);

// Update Installment Status by ID
router.put('/updateStatus', installmentController.updateStatus);

router.put('/updateDueDateNotification/:rentalId/:installmentNo', installmentController.updateDueDateNotificationStatus);


module.exports = router;
