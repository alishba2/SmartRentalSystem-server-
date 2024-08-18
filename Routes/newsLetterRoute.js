const express = require('express');
const router = express.Router();
const newsletterController = require('../Controllers/newsLetterController');

// Route to handle subscription
router.post('/subscribe', newsletterController.subscribe);

module.exports = router;
