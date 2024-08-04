const Property = require('../Models/propertyModel');
const multer = require('multer');

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const createProperty = async (req, res) => {
  upload.array('images', 10)(req, res, async (err) => {
    if (err) {
      console.error("Error uploading files:", err);
      return res.status(500).json({ error: 'Error uploading files' });
    }
    const {
      ownerId,
      markerPosition,
      property,
      address,
      propertyName,
      city,
      zipCode,
      areaSize,
      rentAmount,
      securityDeposit,
      installmentAvailable,
      propertyDescription,
      amenities,
    } = req.body;

    console.log(req.body, "req.body");
    const status = "free";

    try {
      const images = req.files.map(file => ({ data: file.buffer, contentType: file.mimetype }));

      const newProperty = new Property({
        ownerId,
        type: property,
        location: {
          address,
          city,
          zipCode,
        },
        markerPosition,
        price: rentAmount,
        propertyName,
        description: propertyDescription,
        areaSize,
        amenities,
        images: images,
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
  console.log("get all properties");
  try {
    const properties = await Property.find();

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

const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    const imagesWithBase64 = property.images.map((image) => ({
      contentType: image.contentType,
      data: image.data.toString('base64'),
    }));

    const propertyWithBase64Images = {
      ...property.toObject(),
      images: imagesWithBase64,
    };
    console.log("get id---");

    res.json(propertyWithBase64Images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRentalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log(status, "statusssssssssssssss");

    const updatedProperty = await Property.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editProperty = async (req, res) => {
  upload.array('images', 10)(req, res, async (err) => {
    if (err) {
      console.error("Error uploading files:", err);
      return res.status(500).json({ error: 'Error uploading files' });
    }

    const { id } = req.params;
    const {
      ownerId,
      markerPosition,
      property,
      address,
      propertyName,
      city,
      zipCode,
      areaSize,
      rentAmount,
      securityDeposit,
      installmentAvailable,
      propertyDescription,
      amenities,
    } = req.body;

    console.log(req.body, "req.body");

    try {
      const images = req.files.map(file => ({ data: file.buffer, contentType: file.mimetype }));

      const updatedProperty = await Property.findByIdAndUpdate(
        id,
        {
          ownerId,
          type: property,
          location: {
            address,
            city,
            zipCode,
          },
          markerPosition,
          price: rentAmount,
          propertyName,
          description: propertyDescription,
          areaSize,
          amenities,
          images: images,
          rentAmount,
          securityDeposit,
          installments: installmentAvailable,
          status: "free",
        },
        { new: true }
      );

      if (!updatedProperty) {
        return res.status(404).json({ error: "Property not found" });
      }

      res.json(updatedProperty);
    } catch (error) {
      console.error("Error updating property:", error);
      res.status(500).json({ error: error.message });
    }
  });
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPropertiesByOwnerId = async (req, res) => {
  try {
    const { ownerId } = req.params;
    console.log(ownerId, "owner idddddddddddddddddddddddd");

    // Find properties by ownerId
    const properties = await Property.find({ ownerId });

    if (!properties.length) {
      return res.status(404).json({ error: "No properties found for this owner" });
    }

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
  getAllProperties,
  getPropertyById,
  updateRentalStatus,
  editProperty,
  deleteProperty,
  getPropertiesByOwnerId
};
