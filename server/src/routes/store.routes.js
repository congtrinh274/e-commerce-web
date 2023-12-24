const express = require('express');
const router = express.Router();

const storeController = require('../controllers/StoreController');
const { isAuth } = require('../middlewares/auth.middleware');

router.post('/create', isAuth, storeController.create);
router.get('/user', isAuth, storeController.getStoreByUserID);

module.exports = router;
