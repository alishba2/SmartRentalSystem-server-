// routes/rentalRoutes.js
const express = require('express');
const router = express.Router();
const rentalDetailController = require('../Controllers/rentalDetailController');
const multer = require('multer');

// Configure multer to handle file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/rentalDetails', rentalDetailController.createRentalDetail);
router.get('/rentedProperties/:tenantId', rentalDetailController.getRentalDetailsByTenantId);
router.get('/rentalDetails/:propertyId', rentalDetailController.getCurrentRentalByPropertyId);



module.exports = router;
