const mongoose = require('mongoose');

const DamageClaimSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  description: String,
  amount: Number,
  image: String, // Add the image field
});

const DamageClaim = mongoose.model('DamageClaim', DamageClaimSchema);

module.exports = DamageClaim;
