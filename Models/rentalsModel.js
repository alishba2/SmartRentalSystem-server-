const mongoose = require('mongoose');



const RentalSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, required: true },
  ownerId: { type: String, required: true },
  tenantId: { type: String, required: true },
  noOfInstallments: { type: Number, required: true },
  installmentType: { type: String },
  startDate: { type: Date, required: true },
  rentedTill: { type: Date },
  status: { type: String, default: 'pending' },
});

const Rental = mongoose.model('Rental', RentalSchema);

module.exports = Rental;
