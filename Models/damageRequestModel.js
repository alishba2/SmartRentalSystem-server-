const mongoose = require('mongoose');

const DamageRequestSchema = new mongoose.Schema({
    userId: { type: String, required: true },

    rentalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    name: { type: String },
    description: String,
    amount: Number,
    image: String, // Add the image field
});

const DamageClaim = mongoose.model('DamageClaim', DamageClaimSchema);

module.exports = DamageClaim;
