// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../Controllers/contactUs');

// Route to handle contact form submission
router.post('/contact', contactController.createContactUs);

// Optional: Route to get all contact messages (for admin view or similar)
router.get('/contacts', contactController.getAllContacts);

module.exports = router;
