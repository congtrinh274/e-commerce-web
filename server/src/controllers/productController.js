// controllers/productController.js
const db = require('../config/db').promise();

exports.getProducts = async (req, res) => {
  try {
    const [results, fields] = await db.query('SELECT * FROM products');
    res.json(results);
  } catch (error) {
    console.error('Error fetching products: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getProductById = async (req, res) => {
  const productId = req.params.productId;
  console.log('Fetching product by ID:', productId);

  try {
    const [results, fields] = await db.query('SELECT * FROM products WHERE product_id = ?', [productId]);

    if (results.length === 0) {
      console.log(`Product with ID ${productId} not found`);
      res.status(404).json({ error: 'Product not found' });
    } else {
      console.log(`Product with ID ${productId} found`);
      res.json(results[0]);
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}: `, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
