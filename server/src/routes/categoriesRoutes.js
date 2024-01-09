const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/parent', categoriesController.getAllParentCategories);
router.get('/child/:parentCategoryId', categoriesController.getAllChildCategories);
router.post('/', categoriesController.addCategory);
router.put('/:categoryId', categoriesController.editCategory);
router.delete('/:categoryId', categoriesController.deleteCategory);
router.post('/child', categoriesController.addChildCategory); // Updated this line
router.put('/child/:categoryId', categoriesController.editChildCategory);
router.delete('/child/:categoryId', categoriesController.deleteChildCategory);

module.exports = router;