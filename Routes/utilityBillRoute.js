// routes/utilityBillRoutes.js
const express = require('express');
const router = express.Router();
const utilityBillController = require('../Controllers/utilityController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
router.get('/getAllUtilityBills', utilityBillController.getAllUtilityBills);
router.post('/addUtilityBill', upload.single('image'), utilityBillController.createUtilityBill);
router.get('/getUtilityBillById/:id', utilityBillController.getUtilityBillById);
router.get('/getByRentalId/:rentalId', utilityBillController.getUtilityBillsByRentalId);

module.exports = router;
