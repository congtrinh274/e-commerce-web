const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductController');
const { isAuth } = require('../middlewares/auth.middleware');

router.get('/', productController.show);
router.post('/create', isAuth, productController.create);
router.get('/category/:slug', productController.getProductsByCategory);

module.exports = router;
