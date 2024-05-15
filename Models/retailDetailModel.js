const mongoose = require('mongoose');

const rentalDetailsSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    propertyId:{
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
    payment: {
        type: [
            {
                type: mongoose.Schema.Types.Mixed 
            }
        ]
    },
    startDate: {
        type: Date,
    },
    
});

const RentalDetails = mongoose.model('RentalDetails', rentalDetailsSchema);

module.exports = RentalDetails;
