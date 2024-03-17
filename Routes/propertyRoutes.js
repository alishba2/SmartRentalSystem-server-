
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/propertyController');
// Define routes
// router.get('/property', userController.getAllProperty);
router.post('/addproperty', userController.createProperty);
router.get('/property', userController.getAllProperties);

module.exports = router;
