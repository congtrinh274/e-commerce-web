require('dotenv').config();

const upload = require('../middlewares/multer.middleware');
const Product = require('../models/ProductModel');
const Category = require('../models/CategoryModel');
const Store = require('../models/StoreModel');

class ProductController {
    // [GET] products/
    show = async (req, res) => {
        try {
            const products = await Product.find().populate('store');
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    // [GET] products/category/:slug
    getProductsByCategory = async (req, res) => {
        const slug = req.params.slug;

        try {
            const category = await Category.findOne({ slug });

            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }

            const products = await Product.find({ category: category._id });

            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    // [POST] products/create
    create = async (req, res) => {
        try {
            const { name, description, price, countInStock, categoryId } = req.body;
            const sellerID = req.user._id;
            const storeID = req.user.store;
            const store = await Store.findOne({ owner: sellerID }).populate('products');

            const images = req.file.path;

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

            store.products.push(product);
            await store.save();

            await product.save();

            res.status(201).json({ data: product, message: 'Product created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}

module.exports = new ProductController();
