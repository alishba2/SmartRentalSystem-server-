const express = require('express');
const router = express.Router();
const notificationController = require('../Controllers/notificationController');

// Define your routes and link them to the controller

// Route to create a new notification
router.post('/addNotification', notificationController.createNotification);

// Route to get notifications by userId
router.get('/notifications/:userId', notificationController.getNotificationsByUserId);

// Route to mark a specific notification as read
router.put('/notifications/:notificationId/read', notificationController.markNotificationAsRead);

// Route to mark all notifications as read for a user
router.put('/notifications/:userId/read-all', notificationController.markAllNotificationsAsRead);

router.get('/notifications/unreadCount/:userId', notificationController.getUnreadNotificationsCount);


module.exports = router;
