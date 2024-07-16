const mongoose = require('mongoose');

const DamageClaimSchema = new mongoose.Schema({
  userId: { type: String, required: true },

  rentalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  name: { type: String },
  description: String,
  amount: Number,
  image: String, // Add the image field
  repairOption: { type: String, enum: ['owner', 'tenant'], default: 'tenant' }, // Who will repair
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, // Status of the claim
});

const DamageClaim = mongoose.model('DamageClaim', DamageClaimSchema);

module.exports = DamageClaim;
