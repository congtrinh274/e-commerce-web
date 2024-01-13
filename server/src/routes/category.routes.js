const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/CategoryController');
const { isAuth, isAdmin } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer.middleware');

router.get('/', categoryController.show);
router.post('/create', isAuth, isAdmin, upload.single('icon'), categoryController.create);

module.exports = router;
