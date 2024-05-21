const RentalDetails = require('../Models/retailDetailModel');

const createRentalDetail = async (req, res) => {
    try {

        const { ownerId, tenantId,propertyId ,startDate} = req.body;
    
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
        const rentedProperties = await RentalDetails.find({ tenantId });

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

module.exports = {
    createRentalDetail,
    getRentalDetailsByTenantId
};
