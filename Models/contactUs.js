// models/Notification.js
const mongoose = require('mongoose');

const ContactUs = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    message: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('ContactUs', ContactUs);

module.exports = Notification;
