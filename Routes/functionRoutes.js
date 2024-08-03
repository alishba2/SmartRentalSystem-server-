const express = require('express');
const router = express.Router();
const { cancelRent } = require('../Queries/functions.js');

// Cancel rental endpoint
router.post('/cancel-rent', async (req, res) => {
    console.log(req.body, "in cancel rent..............");

    const { propertyId, endDate, status } = req.body;

    const result = await cancelRent(propertyId, endDate, status);

    if (result.error) {
        return res.status(500).json({ error: result.error });
    }

    res.json({ rentalDetail: result.rentalDetail, property: result.property });
});



module.exports = router;
