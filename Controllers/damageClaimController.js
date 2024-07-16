const DamageClaim = require('../Models/damageClaimModel');

// Get all damage claims
const getAllDamageClaims = async (req, res) => {
  try {
    const damageClaims = await DamageClaim.find();
    res.json(damageClaims);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new damage claim
const createDamageClaim = async (req, res) => {
  const { userId, propertyId, description, amount } = req.body;
  const image = req.file ? req.file.path : null; // Get the file path

  try {
    const newDamageClaim = new DamageClaim({ userId, propertyId, description, amount, image });
    const savedDamageClaim = await newDamageClaim.save();
    console.log('Damage claim created successfully');
    res.json(savedDamageClaim);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get damage claim by ID
const getDamageClaimById = async (req, res) => {
  const damageClaimId = req.params.id;

  try {
    const damageClaim = await DamageClaim.findById(damageClaimId);

    if (!damageClaim) {
      return res.status(404).json({ error: 'Damage claim not found' });
    }

    res.json(damageClaim);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDamageClaims,
  createDamageClaim,
  getDamageClaimById,
};
