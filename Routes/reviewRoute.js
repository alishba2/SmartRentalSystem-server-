const express = require('express');
const router = express.Router();
const reviewController = require('../Controllers/reviewController');

// Route to get all reviews
router.get('/getReviews', reviewController.getReviews);

// Route to create a new review
router.post('/addReviews', reviewController.createReview);

module.exports = router;
