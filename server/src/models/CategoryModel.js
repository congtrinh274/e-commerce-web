const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        name: {
            type: String,
        },
        icon: {
            type: String,
        },
        description: {
            type: String,
        },
        slug: {
            type: String,
            slug: 'name',
            unique: true,
        },
    },
    {
        timestamps: true,
    },
);

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
