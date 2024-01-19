// routes/utilityBillRoutes.js
const express = require('express');
const router = express.Router();
const utilityBillController = require('../Controllers/utilityController');

router.get('/getAllUtilityBills', utilityBillController.getAllUtilityBills);
router.post('/addUtilityBill', utilityBillController.createUtilityBill);
router.get('/getUtilityBillById/:id', utilityBillController.getUtilityBillById);

module.exports = router;
