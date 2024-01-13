require('dotenv').config();

const upload = require('../middlewares/multer.middleware');
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
            const { name, description } = req.body;

            const existingCategory = await Category.findOne({ name });

            if (existingCategory) {
                return res.status(400).json({ error: 'Category already exists in the store' });
            }

            const icon = req.file.path;

            const newCategory = new Category({ name, icon, description });
            await newCategory.save();

            res.status(201).json({ data: newCategory, message: 'Category created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}

module.exports = new CategoryController();
