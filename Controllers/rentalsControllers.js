// controllers/rentalController.js
const Rental = require('../Models/rentalsModel');

const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find();
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRental = async (req, res) => {

  const { propertyId, ownerId, tenantId, noOfInstallments, installment, startDate } = req.body;


  try {
    const newRental = new Rental({ propertyId, ownerId, tenantId, noOfInstallments, installment, startDate });
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

  console.log(propertyId,"property id..............");
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

module.exports = {
  getAllRentals,
  createRental,
  getRentalById,
  getRentalByPropertyId
};
