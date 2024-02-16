// routes/rentalRoutes.js
const express = require('express');
const router = express.Router();
const rentalController = require('../Controllers/rentalsControllers');

router.get('/getAllRentals', rentalController.getAllRentals);
router.post('/addRental', rentalController.createRental);
router.get('/getRentalById/:id', rentalController.getRentalById);

module.exports = router;
