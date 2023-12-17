const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['buyer', 'seller', 'both'],
            default: 'buyer',
        },
        buyerInfo: {
            address: String,
            orderHistory: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
        },
        sellerInfo: {
            type: Schema.Types.ObjectId,
            ref: 'Store',
            salesHistory: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
            default: null,
        },
        emailVerificationToken: String,
        emailVerificationExpires: Date,
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
