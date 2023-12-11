require('dotenv').config();
const User = require('../models/UserModel');
const { hashPassword, verifyPassword, generateToken } = require('../middlewares/authMiddleware.js');
const { sendMail } = require('../utils/sendMail.js');
const crypto = require('crypto');

class UserController {
    // [POST] /users/register
    register = async (req, res) => {
        // Check unique Email
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send({ message: 'Email already exist!' });

        try {
            const { username, email, password } = req.body;

            const hashedPassword = await hashPassword(password);

            const user = new User({
                username,
                email,
                password: hashedPassword,
            });

            await user.save();

            const token = crypto.randomBytes(20).toString('hex');
            user.emailVerificationToken = token;
            user.emailVerificationExpires = Date.now() + 3600000;
            await user.save();

            // send verify Email
            sendMail(
                user.email,
                'Email Verification',
                `Please click on the following link to verify your email: ${process.env.APP_BASE_URL}/users/verify/${user.emailVerificationToken}`,
            );

            res.status(201).json({
                message: 'User registered successfully. Please check your email for verification.',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    // [POST] /users/verify:token
    verifyEmail = async (req, res) => {
        try {
            const { token } = req.params;

            const user = await User.findOne({
                emailVerificationToken: token,
                emailVerificationExpires: { $gt: Date.now() },
            });

            if (!user) {
                return res.status(400).json({ error: 'Invalid or expired token' });
            }

            user.emailVerified = true;
            user.emailVerificationToken = undefined;
            user.emailVerificationExpires = undefined;
            await user.save();

            res.status(200).json({ message: 'Email verified successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    //[POST] /users/login
    login = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const passwordMatch = await verifyPassword(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            if (!user.emailVerified) {
                return res.status(403).json({ error: 'Email not verified' });
            }

            const token = generateToken(user._id);

            res.status(200).json({ data: user, meta: token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}

module.exports = new UserController();
