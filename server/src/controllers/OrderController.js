require('dotenv').config();
const Order = require('../models/OrderModel');
const Store = require('../models/StoreModel');

class OrderController {
    async getAllOrdersSeller(req, res) {
        const storeId = req.query.storeId;
        try {
            const orders = await Order.find({ seller: storeId })
                .populate({
                    path: 'buyer',
                })
                .populate({
                    path: 'products',
                });
            console.log(orders);
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
                    path: 'products',
                })
                .populate({
                    path: 'seller',
                });

            console.log(orders);
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
                console.log(store);

                if (!addedStores.includes(store._id)) {
                    // Nếu cửa hàng chưa được thêm vào
                    addedStores.push(store._id);

                    const key = `${store._id}`;

                    shopOrders[key] = {
                        buyer,
                        seller: store._id,
                        products: [_id], // Chỉ lưu product ID
                        totalAmount: quantity * price,
                        address,
                        phoneNumber,
                        paymentMethod,
                        status: 'pending',
                    };
                } else {
                    // Nếu cửa hàng đã được thêm vào, kiểm tra xem đã có order chưa
                    const key = `${seller}`;

                    if (!shopOrders[key]) {
                        shopOrders[key] = {
                            buyer,
                            seller,
                            products: [_id],
                            totalAmount: quantity * price,
                            address,
                            phoneNumber,
                            paymentMethod,
                            status: 'pending',
                        };
                    } else {
                        shopOrders[key].products.push(_id);
                        shopOrders[key].totalAmount += quantity * price;
                    }
                }
            });

            const createdOrders = await Promise.all(
                Object.values(shopOrders).map(async (orderData) => {
                    const order = new Order(orderData);
                    const savedOrder = await order.save();

                    // Lấy ID của order đã được lưu
                    const orderId = savedOrder._id;

                    // Lấy ID của store
                    const storeId = orderData.seller;

                    // Cập nhật mảng order trong model Store
                    await Store.findByIdAndUpdate(storeId, { $push: { order: orderId } });

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
