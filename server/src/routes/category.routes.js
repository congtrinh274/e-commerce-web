const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/CategoryController');
const { isAuth } = require('../middlewares/auth.middleware');

router.get('/', categoryController.show);
router.post('/create', isAuth, categoryController.create);

module.exports = router;
