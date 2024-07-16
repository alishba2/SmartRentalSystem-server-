const UtilityBill = require('../models/utilityBillModel');

const getAllUtilityBills = async (req, res) => {
    try {
        const utilityBills = await UtilityBill.find();
        res.json(utilityBills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUtilityBill = async (req, res) => {
    console.log("IN UTILITY BILL-------------");

    const { userId, rentalId, name, amount, paid } = req.body;
    console.log(req.body, "utility bill.........");
    const image = req.file ? req.file.path : null; // Get the file path

    try {
        const newUtilityBill = new UtilityBill({ userId, rentalId, name, amount, paid, image });
        const savedUtilityBill = await newUtilityBill.save();
        console.log('Utility bill created successfully');
        res.json(savedUtilityBill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUtilityBillById = async (req, res) => {
    const utilityBillId = req.params.id;


    try {
        const utilityBill = await UtilityBill.findById(utilityBillId);

        if (!utilityBill) {
            return res.status(404).json({ error: 'Utility bill not found' });
        }

        res.json(utilityBill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUtilityBillsByRentalId = async (req, res) => {
    const rentalId = req.params.rentalId;
    console.log(rentalId, "rental id===========================");

    try {
        const utilityBills = await UtilityBill.find({ rentalId });
        console.log(utilityBills, "utilityBillssasssssssssssssssss");

        if (utilityBills.length === 0) {
            return res.status(404).json({ error: 'No utility bills found for the given rentalId' });
        }

        res.json(utilityBills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUtilityBills,
    createUtilityBill,
    getUtilityBillById,
    getUtilityBillsByRentalId
};
