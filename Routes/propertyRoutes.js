
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/propertyController');
// Define routes
// router.get('/property', userController.getAllProperty);
router.post('/addproperty', userController.createProperty);
router.get('/property', userController.getAllProperties);
router.get('/getPropertyById/:id', userController.getPropertyById);
router.post('/updatePropertyStatus/:id', userController.updateRentalStatus)

module.exports = router;
