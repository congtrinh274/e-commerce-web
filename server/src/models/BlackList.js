const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlacklistSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    },
);

// Tạo index với expireAfterSeconds
BlacklistSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

const Blacklist = mongoose.model('Blacklist', BlacklistSchema);

module.exports = Blacklist;
