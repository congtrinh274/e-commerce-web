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
const upload = require('../utils/storage');

router.get('/', productController.getAllProducts);
router.post('/', upload.single('image'), productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);


module.exports = router;

