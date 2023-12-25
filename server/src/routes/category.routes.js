const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/CategoryController');
const { isAuth } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer.middleware');

router.get('/', categoryController.show);
router.post('/create', isAuth, upload.single('icon'), categoryController.create);

module.exports = router;
