const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    rating: { type: Number, required: true, min: 1, max: 5 }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
