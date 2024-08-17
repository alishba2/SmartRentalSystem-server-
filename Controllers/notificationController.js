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

// Function to get notifications by userId
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

// Function to mark a specific notification as read
exports.markNotificationAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params; // Get notificationId from request parameters

        // Find the notification by ID and update the isRead field to true
        const notification = await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });

        // If the notification is not found
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found.' });
        }

        res.status(200).json({ message: 'Notification marked as read.', notification });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update notification.' });
    }
};

// New function to mark all notifications as read for a specific user
exports.markAllNotificationsAsRead = async (req, res) => {
    try {
        const { userId } = req.params; // Get userId from request parameters

        // Update all notifications for the user to mark them as read
        const result = await Notification.updateMany({ userId }, { isRead: true });

        // Check if any notifications were updated
        if (result.nModified === 0) {
            return res.status(404).json({ message: 'No unread notifications found for this user.' });
        }

        res.status(200).json({ message: 'All notifications marked as read.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update notifications.' });
    }
};


exports.getUnreadNotificationsCount = async (req, res) => {
    try {

        const { userId } = req.params; // Get userId from request parameters

        // Fetch unread notifications count
        const unreadCount = await Notification.countDocuments({ userId, isRead: false });

        // Return the count if there are unread notifications
        if (unreadCount > 0) {
            res.status(200).json({ unreadCount });
        } else {
            res.status(200).json({ unreadCount: 0 }); // No unread notifications
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch unread notifications count.' });
    }
};