const mongoose = require('mongoose');

const InstallmentSchema = new mongoose.Schema({
  amount: Number,
  dueDate: Date,
  isPaid: { type: Boolean, default: false },
});

const LocationSchema = new mongoose.Schema({
  address: String,
  city: String,

  zipCode: String,



});
const Position = new mongoose.Schema({

  latitude: Number,
  longitude: Number,

})
const ImageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String
});

const PropertySchema = new mongoose.Schema({
  ownerId: String,
  type: { type: String, required: true },
  name: String,
  location: LocationSchema,
  markerPosition: Object,

  price: Number,
  propertyName: String,
  description: String,
  areaSize: String,
  amenities: { type: mongoose.Schema.Types.Mixed }, // Change to Mixed type to accept any data type
  images: [ImageSchema],
  rentAmount: Number,
  securityDeposit: Number,
  installments: Boolean,
  status: String,
  createdOn: { type: Date, default: Date.now },
});

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;
