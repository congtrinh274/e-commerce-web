require('dotenv').config();
const Order = require('../models/OrderModel');
const Store = require('../models/StoreModel');

class OrderController {
    async getAllOrders(req, res) {
        try {
            const orders = await Order.find().populate({
                path: 'products.product',
            });
            res.json(orders);
        } catch {
            res.status(500).json({ message: error.message });
        }
    }
    async getAllOrdersSeller(req, res) {
        const storeId = req.query.storeId;
        try {
            const orders = await Order.find({ seller: storeId })
                .populate({
                    path: 'buyer',
                })
                .populate({
                    path: 'products.product',
                });
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllOrdersBuyer(req, res) {
        const buyerId = req.query.buyerId;
        try {
            const orders = await Order.find({ buyer: buyerId })
                .populate({
                    path: 'products.product',
                })
                .populate({
                    path: 'seller',
                });

            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createOrder(req, res) {
        const { buyer, products, paymentMethod, address, phoneNumber } = req.body;

        try {
            const shopOrders = {};
            const addedStores = [];

            products.forEach((product) => {
                const { store, _id, quantity, price } = product;

                if (!addedStores.includes(store._id)) {
                    addedStores.push(store._id);

                    const key = `${store._id}`;

                    shopOrders[key] = {
                        buyer,
                        seller: store._id,
                        products: [{ product: _id, quantity }],
                        totalAmount: quantity * price,
                        address,
                        phoneNumber,
                        paymentMethod,
                        status: 'pending',
                    };
                } else {
                    const key = `${store._id}`;

                    if (!shopOrders[key]) {
                        shopOrders[key] = {
                            buyer,
                            seller: store._id,
                            products: [{ product: _id, quantity }],
                            totalAmount: quantity * price,
                            address,
                            phoneNumber,
                            paymentMethod,
                            status: 'pending',
                        };
                    } else {
                        shopOrders[key].products.push({ product: _id, quantity });
                        shopOrders[key].totalAmount += quantity * price;
                    }
                }
            });

            const createdOrders = await Promise.all(
                Object.values(shopOrders).map(async (orderData) => {
                    const order = new Order(orderData);
                    const savedOrder = await order.save();

                    const orderId = savedOrder._id;
                    const storeId = orderData.seller;

                    await Store.findByIdAndUpdate(storeId, { $push: { orders: orderId } });

                    return savedOrder;
                }),
            );

            res.status(201).json(createdOrders);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }

    async updateOrderStatus(req, res) {
        console.log(req.body);
        const { orderId, newStatus } = req.body;
        try {
            const order = await Order.findById(orderId);

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            order.status = newStatus;

            await order.save();

            res.status(200).json({ message: 'Update status successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new OrderController();
