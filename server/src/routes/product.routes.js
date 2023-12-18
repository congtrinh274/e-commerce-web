const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductController');
const { isAuth } = require('../middlewares/auth.middleware');

router.post('/create', isAuth, productController.create);
router.get('/show', isAuth, productController.show);

module.exports = router;
