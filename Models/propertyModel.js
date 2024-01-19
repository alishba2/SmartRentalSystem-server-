const mongoose = require('mongoose');

const InstallmentSchema = new mongoose.Schema({
  amount: Number,
  dueDate: Date,
  isPaid: { type: Boolean, default: false },
});

const PropertySchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  type: { type: String, required: true },
  name: String,
  location: String,
  price: Number,
  numberOfBathrooms: Number,
  numberOfRooms: Number,
  description: String,
  images: [{ type: String }],
  rent: {
    amount: Number,
    dueDate: Date,
    installments: [InstallmentSchema],
  },
  status: String

});

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;
