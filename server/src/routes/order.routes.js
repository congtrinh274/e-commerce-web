const express = require('express');
const router = express.Router();

const orderController = require('../controllers/OrderController');
const { isAuth } = require('../middlewares/auth.middleware');

router.get('/all', orderController.getAllOrders);
router.get('/seller', isAuth, orderController.getAllOrdersSeller);
router.get('/buyer', isAuth, orderController.getAllOrdersBuyer);
router.post('/create', isAuth, orderController.createOrder);
router.post('/update', isAuth, orderController.updateOrderStatus);

module.exports = router;
