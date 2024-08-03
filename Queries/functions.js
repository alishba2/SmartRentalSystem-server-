// cancel rent

const RentalDetails = require('../Models/retailDetailModel');
const Property = require('../Models/propertyModel');


const cancelRent = async (propertyId, endDate, status) => {
    try {
        const updatedRentalDetail = await RentalDetails.findOneAndUpdate(
            { propertyId, endDate: { $exists: false } },
            { endDate },
            { new: true }
        );

        if (!updatedRentalDetail) {
            return { error: 'No current rental found for the property id to add end date' };
        }

        const updatedProperty = await Property.findByIdAndUpdate(
            propertyId,
            { status },
            { new: true }
        );

        if (!updatedProperty) {
            return { error: "Property not found" };
        }

        return { rentalDetail: updatedRentalDetail, property: updatedProperty };
    } catch (error) {
        console.error("Error canceling rent:", error);
        return { error: error.message };
    }
};


module.exports = {
    cancelRent,
};
