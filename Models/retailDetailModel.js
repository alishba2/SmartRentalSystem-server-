const mongoose = require('mongoose');

const rentalDetailsSchema = new mongoose.Schema({

    propertyId: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    tenantId: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date, default: null
    }

});

const RentalDetails = mongoose.model('RentalDetails', rentalDetailsSchema);

module.exports = RentalDetails;
