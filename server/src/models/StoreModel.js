const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const StoreSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
        shedAddress: {
            type: String,
            required: true,
        },
        orders: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Order',
            },
        ],
    },
    {
        timestamps: true,
    },
);

const Store = mongoose.model('Store', StoreSchema);

module.exports = Store;
