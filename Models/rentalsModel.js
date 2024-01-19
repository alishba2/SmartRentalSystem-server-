const mongoose = require('mongoose');

const RentalSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, required: true },
  rentedOn: { type: Date, default: Date.now },
  rentedTill: { type: Date },
  status: { type: String, enum: ['active', 'expired'], default: 'active' },
});

const Rental = mongoose.model('Rental', RentalSchema);

module.exports = Rental;
