const mongoose = require('mongoose');

const UtilityBillSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  name: String,
  amount: Number,
  paid: { type: Boolean, default: false },
});

const UtilityBill = mongoose.model('UtilityBill', UtilityBillSchema);

module.exports = UtilityBill;
