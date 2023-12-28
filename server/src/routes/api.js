// File: routes/api.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const emailController = require('../controllers/emailController');
const upgradeController = require('../controllers/upgradeController');
const shopController = require('../controllers/shopController');
const storage = require('../models/storage');
const multer = require('multer');

const upload = multer({ storage: storage });

router.get('/products', productController.getProducts);
router.get('/products/:productId', productController.getProductById);
router.post('/products', upload.single('img'), productController.addProduct);
router.put('/products/:productId', upload.single('img'), productController.updateProduct);
router.delete('/products/:productId', productController.deleteProduct);

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/verify-email', emailController.verifyEmail);
router.get('/confirm-registration/:email/:token', emailController.confirmRegistration);

router.post('/upgrade_role', upgradeController.upgradeRole);

router.get('/check_shop_availability', shopController.checkShopAvailability);


router.get('/cart/:userId', cartController.getCartItems);
router.post('/addcart', cartController.addToCart);
router.delete('/remove/:userId/:productId', cartController.removeFromCart);

module.exports = router;
