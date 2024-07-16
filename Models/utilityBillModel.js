const mongoose = require('mongoose');

const UtilityBillSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  rentalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  name: String,
  amount: Number,
  paid: { type: Boolean, default: false },
  image: String, // Add the image field
});

const UtilityBill = mongoose.model('UtilityBill', UtilityBillSchema);

module.exports = UtilityBill;
