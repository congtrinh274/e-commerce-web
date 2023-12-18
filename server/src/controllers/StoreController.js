require('dotenv').config();

const Store = require('../models/StoreModel');
const User = require('../models/UserModel');

class StoreController {
    // [POST] store/create
    create = async (req, res) => {
        try {
            const { name, bio, phoneNumber, shedAddress } = req.body;
            const owner = req.user._id;

            // Kiểm tra xem người dùng đã có cửa hàng hay chưa
            const existingStore = await Store.findOne({ owner: owner });
            if (existingStore) {
                return res.status(400).json({ error: 'The user already has a store' });
            }

            const store = new Store({
                name,
                bio,
                owner,
                phoneNumber,
                shedAddress,
            });

            await store.save();

            // Cập nhật thông tin người dùng với ID cửa hàng mới
            await User.findByIdAndUpdate(owner, { $set: { store: store._id } });

            res.status(201).json({ data: store, message: 'Store created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}

module.exports = new StoreController();
