// controllers/utilityBillController.js
const UtilityBill = require('../Models/utilityBillModel');

const getAllUtilityBills = async (req, res) => {
    try {
      const utilityBills = await UtilityBill.find(); // Corrected variable name
      res.json(utilityBills); // Corrected variable name
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
const createUtilityBill = async (req, res) => {
    const { userId, propertyId, name, amount, paid } = req.body;

    try {
        const newUtilityBill = new UtilityBill({ userId, propertyId, name, amount, paid });
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

module.exports = {
    getAllUtilityBills,
    createUtilityBill,
    getUtilityBillById,
};
