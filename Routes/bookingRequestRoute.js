// BookingRequestRoutes.js
const express = require('express');
const router = express.Router();
const bookingRequestController = require('../Controllers/bookingRequestController');

// Route to create a new booking request
router.post('/booking-request', bookingRequestController.createBookingRequest);
router.get('/getBooking/:userId', bookingRequestController.getBookingRequestsByUserId);
router.get('/getBookingRequestsByPropertyId/:propertyId', bookingRequestController.getBookingRequestsByPropertyId)

module.exports = router;
