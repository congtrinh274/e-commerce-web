const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlacklistSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true,
        },
        expireAt: {
            type: Date,
            expires: process.env.ACCESS_TOKEN_LIFE,
        },
    },
    {
        timestamps: true,
    },
);

const Blacklist = mongoose.model('Blacklist', BlacklistSchema);

module.exports = Blacklist;
