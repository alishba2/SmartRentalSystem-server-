// routes/damageClaimRoutes.js
const express = require('express');
const router = express.Router();
const damageClaimController = require('../Controllers/damageClaimController');

router.get('/getDamageClaim', damageClaimController.getAllDamageClaims);
router.post('/addDamageClaim', damageClaimController.createDamageClaim);
router.get('getDamageClaimById/:id', damageClaimController.getDamageClaimById);

module.exports = router;
