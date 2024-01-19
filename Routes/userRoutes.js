
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
// Define routes
router.get('/property', userController.getAllProperty);
router.post('/property', userController.createProperty);
router.get('/property/:id', userController.getPropertyById);

module.exports = router;
