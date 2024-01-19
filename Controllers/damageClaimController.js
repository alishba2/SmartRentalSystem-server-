// controllers/damageClaimController.js
const DamageClaim = require('../Models/damageClaimModel');

const getAllDamageClaims = async (req, res) => {
  try {
    const damageClaims = await DamageClaim.find();
    res.json(damageClaims);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDamageClaim = async (req, res) => {
  const { userId, propertyId, description, amount, settled } = req.body;

  try {
    const newDamageClaim = new DamageClaim({ userId, propertyId, description, amount, settled });
    const savedDamageClaim = await newDamageClaim.save();
    console.log('Damage claim created successfully');
    res.json(savedDamageClaim);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
