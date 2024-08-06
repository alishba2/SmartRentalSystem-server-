// routes/rentalRoutes.js
const express = require('express');
const router = express.Router();
const rentalController = require('../Controllers/rentalsControllers');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get('/getAllRentals', rentalController.getAllRentals);
router.post('/addRental', rentalController.createRental);
router.get('/getRentalById/:id', rentalController.getRentalById);
router.get('/getRentalByPropertyId/:propertyId', rentalController.getRentalByPropertyId);
router.post('/payInstallment', upload.single('receipt'), rentalController.payInstallment);
router.put('/rentals/:id', rentalController.updateRentalStatus);



module.exports = router;
