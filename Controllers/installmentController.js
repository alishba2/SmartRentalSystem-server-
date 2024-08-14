const Installment = require("../Models/installmentsModel");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // configure storage as needed

// Create Installment
exports.createInstallment = async (req, res) => {
    try {
        const { rentalId, installments, month } = req.body;

        // Check if an installment for the given rentalId and month already exists
        const existingInstallment = await Installment.findOne({ rentalId, month });
        if (existingInstallment) {
            console.log("already exist");
            return res.status(400).json({ error: 'Installment for this month already exists' });
        }

        console.log("creating installments");
        console.log(rentalId, installments, month);
        const newInstallment = new Installment({
            rentalId,
            installments,
            month
        });

        const savedInstallment = await newInstallment.save();
        res.status(201).json(savedInstallment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Installments by Rental ID
exports.getInstallmentsByRentalId = async (req, res) => {

    const { rentalId } = req.params;
    // console.log(rentalId, "rental idddddddddddddddddddddddddddddddd");

    const installments = await Installment.find({ rentalId });
    // console.log(installments);
    if (!installments.length) {
        return res.status(404).json({ error: 'No installments found for this rental ID' });
    }
    res.status(200).json(installments);

};

// Pay an Installment


exports.payInstallment = async (req, res) => {
    console.log("paying installment0000000000");
    try {
        const { rentalId, installmentNo } = req.params;
        const { paymentMethod } = req.body;
        const receipt = req.file; // multer adds this to req

        if (!paymentMethod || !receipt) {
            return res.status(400).json({ error: 'Missing paymentMethod or receipt' });
        }

        console.log(paymentMethod, receipt, rentalId, installmentNo, "paying");

        const installment = await Installment.findOneAndUpdate(
            { rentalId, 'installments.installmentNo': installmentNo },
            {
                $set: {
                    'installments.$.status': 'paid',
                    'installments.$.paidDate': new Date(),
                    'installments.$.paymentMethod': paymentMethod,
                    'installments.$.receipt': receipt.path, // Save file path or name
                    'installments.$.verificationStatus': 'unverified' // Set verification status to unverified
                }
            },
            { new: true }
        );

        if (!installment) {
            return res.status(404).json({ error: 'Installment not found' });
        }

        res.status(200).json(installment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.verifyInstallment = async (req, res) => {
    console.log("verifying installment");
    try {
        const { rentalId, installmentNo } = req.params;

        const installment = await Installment.findOneAndUpdate(
            { rentalId, 'installments.installmentNo': installmentNo },
            {
                $set: {
                    'installments.$.verificationStatus': 'verified' // Set verification status to verified
                }
            },
            { new: true }
        );

        if (!installment) {
            return res.status(404).json({ error: 'Installment not found' });
        }

        res.status(200).json(installment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update Installment Status
exports.updateInstallmentStatus = async (req, res) => {
    try {
        const { rentalId, installmentNo } = req.params;
        const { status } = req.body;

        // Check if the provided status is valid
        if (!['paid', 'pending', 'expired'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status provided' });
        }

        // Find and update the installment status
        const installment = await Installment.findOneAndUpdate(
            { rentalId, 'installments.installmentNo': installmentNo },
            {
                $set: { 'installments.$.status': status }
            },
            { new: true }
        );

        if (!installment) {
            return res.status(404).json({ error: 'Installment not found' });
        }

        res.status(200).json(installment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateStatus = async (req, res) => {
    console.log(req.body, "expireddddddd");
    try {
        const { id, installmentId, status } = req.body;

        // Check if the provided status is valid
        if (!['paid', 'pending', 'expired'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status provided' });
        }

        // Find the document by ID and update the specific installment's status
        const updatedDoc = await Installment.findOneAndUpdate(
            { _id: id, 'installments._id': installmentId },
            { $set: { 'installments.$.status': status } },
            { new: true } // Return the updated document
        );

        if (!updatedDoc) {
            return res.status(404).json({ error: 'Installment not found' });
        }

        res.status(200).json(updatedDoc);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
