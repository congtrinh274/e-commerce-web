const express = require('express');
const router = express.Router();
const productController = require('./controllers/productController');
const authController = require('./controllers/authController');
const emailController = require('./controllers/emailController');
const upgradeController = require('./controllers/upgradeController'); // Import sellerController

router.get('/products', productController.getProducts);
router.get('/products/:productId', productController.getProductById);
router.post('/login', authController.login);
router.post('/register', authController.register);
// router.post('/check-auth', authController.checkAuth);
// router.post('/resend-verification-email', authController.resendVerificationEmail);
router.get('/verify-email', emailController.verifyEmail);
router.get('/confirm-registration/:email/:token', emailController.confirmRegistration);

// Use sellerController for create-store and upgrade-role
router.post('/upgrade_role', upgradeController.upgradeRole);
module.exports = router;
