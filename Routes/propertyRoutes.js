
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/propertyController');
// Define routes
// router.get('/property', userController.getAllProperty);
router.post('/addproperty', userController.createProperty);
router.get('/property', userController.getAllProperties);
router.get('/getPropertyById/:id', userController.getPropertyById);
router.get('/getProperty/:ownerId', userController.getPropertiesByOwnerId);
router.post('/updatePropertyStatus/:id', userController.updateRentalStatus);
router.put('/property/:id', userController.editProperty);
router.delete('/property/:id', userController.deleteProperty);


module.exports = router;
