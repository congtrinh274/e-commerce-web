// routes/productRoutes.js
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 * 
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     responses:
 *       '200':
 *         description: A list of products
 * 
 *   post:
 *     summary: Create a new product
 *     responses:
 *       '200':
 *         description: Successfully created a new product
 * 
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A single product
 * 
 *   put:
 *     summary: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully updated a product
 */

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Create a multer instance with the configured storage
const upload = multer({ storage: storage });

router.get('/', productController.getAllProducts);
router.post('/', upload.array('image', 10), productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);

module.exports = router;
