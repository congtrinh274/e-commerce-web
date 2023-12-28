// controllers/productController.js
const Product = require('../models/Product');

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
    const { productName, description, category, variations } = req.body;
    console.log('Received request:', req.body); 

    // Check if the required fields are present
    if (!productName || !description || !category || !variations) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const variationsArray = JSON.parse(variations);

    // Check if images are present
    if (!req.files || req.files.length === 0) {
      console.log('No image files provided');
      return res.status(400).json({ message: 'No image files provided' });
    }

    const images = req.files.map((file) => file.path);

    const productId = await Product.createProduct(
      productName,
      description,
      category,
      variationsArray,
      images
    );

    console.log('Product created successfully');
    res.json({ productId });
  } catch (error) {
    console.error(error);
    console.log('Internal Server Error');
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, description, price } = req.body;

  try {
    await Product.updateProduct(productId, name, description, price);
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
