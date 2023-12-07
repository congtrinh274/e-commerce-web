const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
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
            enum: ['buyer', 'seller', 'both'], // Enum: buyer, seller, or both
            default: 'buyer',
        },
        buyerInfo: {
            address: String,
            orderHistory: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
        },
        sellerInfo: {
            storeName: String,
            storeDescription: String,
            salesHistory: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
        },
        emailVerified: {
            type: Boolean,
            default: false,
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
