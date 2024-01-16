const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        buyer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'Store',
            required: true,
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
        address: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: String,
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'completed', 'cancelled'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    },
);

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
