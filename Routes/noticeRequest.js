const express = require('express');
const router = express.Router();
const noticeController = require('../Controllers/noticeController');

// Create a new notice
router.post('/sendNotice', noticeController.createNotice);

// Get all notices
router.get('/notices', noticeController.getAllNotices);

// Get a single notice by ID
router.get('/notices/:id', noticeController.getNoticeById);

// Update a notice by ID
router.put('/notices/:id', noticeController.updateNoticeById);

// Delete a notice by ID
router.delete('/notices/:id', noticeController.deleteNoticeById);

router.get('/notices/:tenantId/:propertyId', noticeController.getNoticesByTenantAndProperty);


module.exports = router;
