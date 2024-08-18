const mongoose = require('mongoose');

const InstallmentSchema = new mongoose.Schema({
    rentalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental', required: true },
    installments: [
        {
            installmentNo: Number,
            amount: { type: Number, required: true },
            dueDate: { type: Date, required: true },
            paidDate: { type: Date },
            status: { type: String, default: 'unpaid' },
            paymentMethod: { type: [String], default: [] }, // Change to array

            receipt: { type: String }, // Store the path to the receipt file
            verificationStatus: { type: String, default: 'unverified' }, // Track verification status,
            dueDateNotiifcationSent: { type: Boolean, default: false }
        }
    ],
    month: { type: String }
});

const Installment = mongoose.model('Installment', InstallmentSchema);

module.exports = Installment;
