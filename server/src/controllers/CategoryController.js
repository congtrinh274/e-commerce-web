require('dotenv').config();

const Category = require('../models/CategoryModel');
const Store = require('../models/StoreModel');

class CategoryController {
    // [GET] categories/
    show = async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    // [POST] category/create
    create = async (req, res) => {
        try {
            const { name, icon, description } = req.body;
            const store = await Store.findOne({ owner: req.user._id }).populate('categories');

            const existingCategory = store.categories.find((category) => category.name === name);

            if (existingCategory) {
                return res.status(400).json({ error: 'Category already exists in the store' });
            }

            const newCategory = new Category({ name, icon, description, store: store._id });
            await newCategory.save();

            store.categories.push(newCategory);
            await store.save();

            res.status(201).json({ data: newCategory, message: 'Category created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}

module.exports = new CategoryController();
