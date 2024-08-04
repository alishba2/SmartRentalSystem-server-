// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../Controllers/notificationController');

// Define your routes and link them to the controller
router.post('/addNotification', notificationController.createNotification);

router.get('/notifications/:userId', notificationController.getNotificationsByUserId);

module.exports = router;
