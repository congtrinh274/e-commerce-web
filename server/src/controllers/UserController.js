require('dotenv').config();
const User = require('../models/UserModel');
const { hashPassword } = require('../middlewares/authMiddleware.js');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

class UserController {
    // [POST] /users/register
    register = async (req, res) => {
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

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.TRANSPORTER,
                    pass: process.env.EMAIL_APPLICATION_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_APPLICATION_PASSWORD,
                to: user.email,
                subject: 'Email Verification', // Chủ đề email
                text: `Please click on the following link to verify your email: ${process.env.APP_BASE_URL}/users/verify/${user.emailVerificationToken}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

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
}

module.exports = new UserController();
