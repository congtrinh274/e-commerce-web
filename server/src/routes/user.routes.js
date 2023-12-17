const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const { isAuth } = require('../middlewares/auth.middleware');

router.get('/profile', isAuth, userController.getProfile);

module.exports = router;
