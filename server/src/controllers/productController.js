// controllers/productController.js
const Product = require('../models/Product');
const path = require('path');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.createProduct = async (req, res) => {
  try {
    const { user_id, productName, description, category, variations } = req.body;
    console.log('Received request:', req.body);

    if (!productName || !description || !category || !variations) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const variationsArray = JSON.parse(variations);

    if (!variationsArray || variationsArray.length === 0) {
      console.log('No variations provided');
      return res.status(400).json({ message: 'No variations provided' });
    }


    const productId = await Product.createProduct(
      user_id,
      productName,
      description,
      category,
      variationsArray
    );

    console.log('Product created successfully');
    res.json({ productId });
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { label } = req.body;

  try {
    await Product.updateProduct(productId, label);
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  
};
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    await Product.deleteProduct(productId);
    res.json({ message: 'Product delete successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};