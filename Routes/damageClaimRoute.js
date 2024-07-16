// routes/damageClaimRoutes.js
const express = require('express');
const router = express.Router();
const damageClaimController = require('../Controllers/damageClaimController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
router.get('/getDamageClaim', damageClaimController.getAllDamageClaims);
router.post('/addDamageClaim', upload.single('image'), damageClaimController.createDamageClaim);
router.get('/getDamageClaimById/:id', damageClaimController.getDamageClaimById);
router.get('/getDamageClaimByTenant/:rentalId', damageClaimController?.getDamageClaimByRentalId);
router.put('/UpdateDamageClaims/:id', damageClaimController.updateDamageClaim);

module.exports = router;
