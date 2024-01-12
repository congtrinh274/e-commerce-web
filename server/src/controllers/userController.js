// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Shop = require('../models/Shop');
const { sendVerificationEmail } = require('../utils/emailUtils');
const crypto = require('crypto');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getAllBuyer = async (req, res) => {
    try {
        const users = await User.getAllBuyer();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getAllSeller = async (req, res) => {
    try {
        const users = await User.getAllSeller();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.id;


    try {
        const user = await User.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.createUser = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const userId = await User.createUser(email, hashedPassword, role, verificationToken);

        await sendVerificationEmail(email, verificationToken);

        res.status(201).json({ userId, verificationToken }); // Include verificationToken in the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.createShop = async (req, res) => {
    const { shop_name, description, user_id } = req.body;

    try {
        const shop = await Shop.createShop(shop_name, description, user_id);

        await User.updateUserRole(user_id, 'seller');

        res.status(201).json({ shop, message: 'Shop created successfully. User role updated to seller.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { email, password, role } = req.body;

    try {
        // Hash the password if provided
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        await User.updateUser(userId, email, hashedPassword, role);
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log('Received request:', req.body); 

    try {
        const user = await User.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        if (user.is_verified === '1') {
            res.json({ message: 'Login successful', user });
        } else {
            res.status(403).json({ message: 'Please verify your email address' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        const user = await User.getUserByVerificationToken(token);

        if (!user) {
            return res.status(404).json({ message: 'User not found or already verified' });
        }

        await User.verifyUser(user.user_id); // Use user.user_id consistently

        res.json({ message: 'Email verification successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

