const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    tenantId: {
        type: String,
        required: true
    },
    noticeDate: {
        type: Date,
        required: true
    },
    noticePeriod: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    additionalNotes: {
        type: String
    }
}, {
    timestamps: true
});

const Notice = mongoose.model('Notice', NoticeSchema);

module.exports = Notice;
