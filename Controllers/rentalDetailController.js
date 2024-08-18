const RentalDetails = require('../Models/retailDetailModel');

const createRentalDetail = async (req, res) => {
    try {
        const { ownerId, tenantId, propertyId, startDate } = req.body;

        // Create a new rental detail instance
        const newRentalDetail = new RentalDetails({
            propertyId,
            ownerId,
            tenantId,
            startDate
        });

        // Save the rental detail to the database
        const savedRentalDetail = await newRentalDetail.save();

        res.status(201).json(savedRentalDetail);
    } catch (error) {
        console.error("Error creating rental detail:", error);
        res.status(500).json({ error: error.message });
    }
};

const getRentalDetailsByTenantId = async (req, res) => {
    try {
        const { tenantId } = req.params;

        if (!tenantId) {
            return res.status(400).json({ error: "Missing tenantId parameter" });
        }

        // Query the database to find rental details by tenantId
        const rentedProperties = await RentalDetails.find({
            tenantId,
            $or: [
                { endDate: { $exists: false } }, // Check if endDate does not exist
                { endDate: null } // Check if endDate is null
            ]
        });

        // Check if any rental details are found
        if (rentedProperties.length === 0) {
            return res.status(200).json({ message: "No rented properties found for the given tenantId" });
        }

        // Return the rental details
        res.json(rentedProperties);
    } catch (error) {
        console.error("Error retrieving rental details by tenantId:", error);
        res.status(500).json({ error: error.message });
    }
};


const getCurrentRentalByPropertyId = async (req, res) => {
    const propertyId = req.params.propertyId;
    console.log(propertyId, "propertyId=======================");

    try {
        const rental = await RentalDetails.findOne({
            propertyId,
            endDate: { $exists: false }
        });

        if (!rental) {
            return res.status(404).json({ error: 'No current rental found for the property id' });
        }

        res.json(rental);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addRentalEndDate = async (req, res) => {
    const { propertyId, endDate } = req.body;

    try {
        // Find the rental detail by propertyId and update the endDate
        const updatedRentalDetail = await RentalDetails.findOneAndUpdate(
            { propertyId, endDate: { $exists: false } },
            { endDate },
            { new: true }
        );

        if (!updatedRentalDetail) {
            return res.status(404).json({ error: 'No current rental found for the property id to add end date' });
        }

        res.json(updatedRentalDetail);
    } catch (error) {
        console.error("Error adding end date to rental detail:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRentalDetail,
    getRentalDetailsByTenantId,
    getCurrentRentalByPropertyId,
    addRentalEndDate
};
