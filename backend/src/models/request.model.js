const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const requestSchema = new mongoose.Schema({
    requestBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    requestFor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

requestSchema.index({ requestBy: 1, requestFor: 1 }, { unique: true });

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
