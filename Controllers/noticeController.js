const Notice = require('../Models/noticeModel');

// Create a new notice
exports.createNotice = async (req, res) => {
    try {
        const { propertyId, tenantId, noticeDate, noticePeriod, reason, additionalNotes } = req.body;

        const newNotice = new Notice({
            propertyId,
            tenantId,
            noticeDate,
            noticePeriod,
            reason,
            additionalNotes
        });

        await newNotice.save();

        res.status(201).json({ message: 'Notice created successfully', data: newNotice });
    } catch (error) {
        console.error('Error creating notice:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all notices
exports.getAllNotices = async (req, res) => {
    try {
        const notices = await Notice.find();
        res.status(200).json(notices);
    } catch (error) {
        console.error('Error fetching notices:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single notice by ID
exports.getNoticeById = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }
        res.status(200).json(notice);
    } catch (error) {
        console.error('Error fetching notice:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a notice by ID
exports.updateNoticeById = async (req, res) => {
    try {
        const updatedNotice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNotice) {
            return res.status(404).json({ message: 'Notice not found' });
        }
        res.status(200).json({ message: 'Notice updated successfully', data: updatedNotice });
    } catch (error) {
        console.error('Error updating notice:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a notice by ID
exports.deleteNoticeById = async (req, res) => {
    try {
        const deletedNotice = await Notice.findByIdAndDelete(req.params.id);
        if (!deletedNotice) {
            return res.status(404).json({ message: 'Notice not found' });
        }
        res.status(200).json({ message: 'Notice deleted successfully' });
    } catch (error) {
        console.error('Error deleting notice:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getNoticesByTenantAndProperty = async (req, res) => {
    try {
        const { tenantId, propertyId } = req.params;

        // Find notices that match both tenantId and propertyId
        const notices = await Notice.find({ tenantId, propertyId });

        if (notices.length === 0) {
            return res.status(404).json({ message: 'No notices found for the given tenant and property' });
        }
        res.status(200).json(notices);
    } catch (error) {
        console.error('Error fetching notices:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};