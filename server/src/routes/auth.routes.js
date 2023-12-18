const express = require('express');
const router = express.Router();

const authController = require('../controllers/AuthController');
const { isAuth } = require('../middlewares/auth.middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify/:token', authController.verifyEmail);
router.post('/refresh', isAuth, authController.refreshToken);
router.post('/logout', isAuth, authController.logout);

module.exports = router;
