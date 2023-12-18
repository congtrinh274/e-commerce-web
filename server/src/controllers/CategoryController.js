require('dotenv').config();

const Category = require('../models/CategoryModel');

class CategoryController {
    // [POST] category/create
    create = async (req, res) => {
        try {
            const { name, icon, description } = req.body;

            // Kiểm tra xem category đã tồn tại hay chưa
            const existingCategory = await Category.findOne({ name });
            if (existingCategory) {
                return res.status(400).json({ error: 'Category with this name already exists' });
            }

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
