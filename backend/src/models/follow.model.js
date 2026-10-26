const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const followSchema = new mongoose.Schema({
    followBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    follow: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

followSchema.index({ followBy: 1, follow: 1 }, { unique: true });

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;
