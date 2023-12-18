require('dotenv').config();

const Product = require('../models/ProductModel');

class ProductController {
    // [GET] products/show
    show = async (req, res) => {};

    // [POST] products/create
    create = async (req, res) => {
        try {
            const { name, description, price, countInStock, images, categoryId } = req.body;
            const sellerID = req.user._id;
            const storeID = req.user.store;

            const product = new Product({
                name,
                description,
                price,
                countInStock,
                images,
                store: storeID,
                seller: sellerID,
                category: categoryId,
            });

            await product.save();

            res.status(201).json({ data: product, message: 'Product created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}

module.exports = new ProductController();
