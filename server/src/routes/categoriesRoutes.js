const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const upload = require('../utils/storage');
router.get('/parent', categoriesController.getAllParentCategories);
router.get('/child/:parentCategoryId', categoriesController.getAllChildCategories);
router.post('/', upload.single('image'), categoriesController.addCategory);
router.put('/:categoryId',upload.single('image'), categoriesController.editCategory);
router.delete('/:categoryId', categoriesController.deleteCategory);
router.post('/child', upload.single('image'), categoriesController.addChildCategory);
router.put('/child/:categoryId', categoriesController.editChildCategory);
router.delete('/child/:categoryId', categoriesController.deleteChildCategory);

module.exports = router;