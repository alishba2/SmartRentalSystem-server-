// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    tenantId: { type: String },
    ownerId: { type: String },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
