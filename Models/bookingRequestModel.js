// BookingRequestModel.js
const mongoose = require('mongoose');

const bookingRequestSchema = new mongoose.Schema({
  userId: String, 
  name: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  numFamilyMembers: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  installmentType:{
    type:String,
  },
  ownerId: {
    type:String,
    required:true
  },
  propertyId:{
    type:String,
    required:true
  }
});

const BookingRequest = mongoose.model('BookingRequest', bookingRequestSchema);

module.exports = BookingRequest;
