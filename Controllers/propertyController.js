const Property = require('../Models/propertyModel');
const multer = require('multer');

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const createProperty = async (req, res) => {
  upload.array('images', 5)(req, res, async (err) => { // Assuming 'images' is the field name for the array of images
    if (err) {
      console.error("Error uploading files:", err);
      return res.status(500).json({ error: 'Error uploading files' });
    }
    const {
      ownerId,
      markerPosition,
      property,
      address,
      city,
      state,
      zipCode,
      country,
      areaSize,
      rentAmount,
      securityDeposit,
      installmentAvailable,
      propertyDescription,
      amenities,
    } = req.body;

    const status = "free";

    try {
      const images = req.files.map(file => ({ data: file.buffer, contentType: file.mimetype }));

      const newProperty = new Property({
        ownerId, // Assuming ownerId is extracted from authentication middleware
        type: property,
        name: address,
        location: {
          address,
          city,
          stateProvince: state,
          zipCode,
          country,
          location: markerPosition,
        },
        price: rentAmount,
        description: propertyDescription,
        areaSize,
        amenities,
        images: images, // Save images array to MongoDB
        rentAmount,
        securityDeposit,
        installments: installmentAvailable,
        status,
      });
      console.log(images, "images-----------")

      const savedProperty = await newProperty.save();
      console.log("Property created successfully");
      res.json(savedProperty);
    } catch (error) {
      console.error("Error creating property:", error);
      res.status(500).json({ error: error.message });
    }
  });
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    // Convert images to base64-encoded strings
    const propertiesWithBase64Images = properties.map((property) => {
      const imagesWithBase64 = property.images.map((image) => ({
        contentType: image.contentType,
        data: image.data.toString('base64'),
      }));

      return {
        ...property.toObject(),
        images: imagesWithBase64,
      };
    });

    res.json(propertiesWithBase64Images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProperty,
  getAllProperties
};
