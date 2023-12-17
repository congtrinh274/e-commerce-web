const express = require('express');
const router = express.Router();

const authController = require('../controllers/AuthController');
const { isAuth } = require('../middlewares/auth.middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.use(isAuth);

router.post('/refresh', authController.refreshToken);
router.get('/verify/:token', authController.verifyEmail);
router.post('/logout', authController.logout);

module.exports = router;
