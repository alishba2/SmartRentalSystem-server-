// controllers/notificationController.js
const Notification = require('../Models/notificationModel');

// Existing function for creating notifications
exports.createNotification = async (req, res) => {
    try {
        console.log(req.body);

        const { userId, tenantId, ownerId, message } = req.body;

        const notification = new Notification({
            userId,    // Already a string
            tenantId,  // Already a string
            ownerId,   // Already a string
            message
        });

        await notification.save();
        res.status(201).json({ message: 'Notification created successfully.', notification });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create notification.' });
    }
};

// New function to get notifications by userId
exports.getNotificationsByUserId = async (req, res) => {
    try {
        const { userId } = req.params; // Get userId from request parameters

        // Fetch notifications where the userId matches
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }); // Sorting by latest first

        // If no notifications are found
        if (notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found for this user.' });
        }

        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications.' });
    }
};
