// routes/rentalRoutes.js
const express = require('express');
const router = express.Router();
const rentalController = require('../Controllers/rentalsControllers');

router.get('/all', rentalController.getAllRentals);
router.post('/create', rentalController.createRental);
router.get('/:id', rentalController.getRentalById);

module.exports = router;
