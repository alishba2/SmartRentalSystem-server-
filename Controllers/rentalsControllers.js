// controllers/rentalController.js
const Rental = require('../Models/rentalsModel');
const fs = require('fs');

const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find();
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRental = async (req, res) => {

  const { propertyId, ownerId, tenantId, noOfInstallments, installmentType, startDate } = req.body;


  try {
    const newRental = new Rental({ propertyId, ownerId, tenantId, noOfInstallments, installmentType, startDate });
    const savedRental = await newRental.save();
    console.log("Rental created successfully");
    res.json(savedRental);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRentalById = async (req, res) => {
  const rentalId = req.params.id;

  try {
    const rental = await Rental.findById(rentalId);

    if (!rental) {
      return res.status(404).json({ error: 'Rental not found' });
    }

    res.json(rental);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRentalByPropertyId = async (req, res) => {
  const propertyId = req.params.propertyId; // Assuming propertyId is passed as a parameter

  console.log(propertyId, "property id..............");
  try {
    const rentals = await Rental.find({ propertyId: propertyId });

    if (!rentals || rentals.length === 0) {
      return res.status(404).json({ error: 'No rentals found for the property id' });
    }

    res.json(rentals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const payInstallment = async (req, res) => {
  console.log("Paying installment..."); b
  try {
    const { tenantId, propertyId, installmentNumber, paymentMethod, accountTitle, accountNumber } = req.body;
    const receipt = req.file ? req.file.path : null;

    // Log incoming request data
    console.log("Request Data:", { tenantId, propertyId, installmentNumber, paymentMethod, accountTitle, accountNumber, receipt });

    const rentalDetail = await Rental.findOneAndUpdate(
      { tenantId, propertyId, "installment.installmentNumber": parseInt(installmentNumber) },
      {
        $set: {
          "installment.$.paymentMethod": paymentMethod,
          "installment.$.receipt": receipt,
          "installment.$.accountTitle": accountTitle,
          "installment.$.accountNumber": accountNumber,
          "installment.$.status": 'approval requested',
        },
      },
      { new: true }
    );

    if (!rentalDetail) {
      return res.status(404).json({ error: "Rental detail not found or installment not found" });
    }

    console.log("Updated Rental Detail:", rentalDetail);

    res.status(200).json(rentalDetail);
  } catch (error) {
    console.error("Error paying installment:", error);
    res.status(500).json({ error: error.message });
  }
};


const updateRentalStatus = async (req, res) => {
  console.log("id-------------------");
  const { id } = req.params; // Assuming rentalId is passed as a URL parameter
  const { status } = req.body; // The new status is passed in the request body

  try {
    const updatedRental = await Rental.findByIdAndUpdate(
      id,
      { status: status }, // Update the status field
      { new: true } // Return the updated document
    );

    if (!updatedRental) {
      return res.status(404).json({ error: 'Rental not found' });
    }

    res.json(updatedRental);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRentals,
  createRental,
  getRentalById,
  getRentalByPropertyId,
  payInstallment,
  updateRentalStatus
};
