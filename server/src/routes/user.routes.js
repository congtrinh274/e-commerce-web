const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.post('/register', userController.register);
router.get('/verify/:token', userController.verifyEmail);

module.exports = router;
