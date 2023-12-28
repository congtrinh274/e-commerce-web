/**
 * @swagger
 * tags:
 *   name: Variations
 *   description: API endpoints for managing variations
 * 
 * /variations/categories:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       '200':
 *         description: A list of categories
 * 
 * /variations/colors:
 *   get:
 *     summary: Get all colors
 *     responses:
 *       '200':
 *         description: A list of colors
 * 
 * /variations/sizes:
 *   get:
 *     summary: Get all sizes
 *     responses:
 *       '200':
 *         description: A list of sizes
 */

const express = require('express');
const router = express.Router();
const variationController = require('../controllers/variationController');
router.get('/categories/:parent_category_id', variationController.getAllCategories);
router.get('/parent/categories', variationController.getAllParentCategories);
router.get('/colors', variationController.getAllColors);
router.get('/sizes', variationController.getAllSizes);

module.exports = router;
