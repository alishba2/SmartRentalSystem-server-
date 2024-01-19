// controllers/userController.js
const Property = require('../Models/propertyModel'); // Updated import statement

const getAllProperty = async (req, res) => {
  try {
    const properties = await Property.find(); // Updated variable name
    res.json(properties); // Updated variable name
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProperty = async (req, res) => {
  const {
    ownerId,
    type,
    name,
    location,
    price,
    numberOfBathrooms,
    numberOfRooms,
    description,
    rentAmount,
    dueDate,
    installments,
    images,
  } = req.body;
  const status = "free";

  try {
    const newProperty = new Property({
      ownerId,
      type,
      name,
      location,
      price,
      numberOfBathrooms,
      numberOfRooms,
      description,
      status,
      rent: {
        amount: rentAmount,
        dueDate,
        installments: installments || [],
      },
      images: images || [],
    });

    const savedProperty = await newProperty.save();
    console.log("Property created successfully");
    res.json(savedProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPropertyById = async (req, res) => {
  const propertyId = req.params.id; // Updated variable name

  try {
    const property = await Property.findById(propertyId); // Updated variable name

    if (!property) {
      return res.status(404).json({ error: 'Property not found' }); // Updated error message
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProperty, // Updated function name
  createProperty,
  getPropertyById,
};
