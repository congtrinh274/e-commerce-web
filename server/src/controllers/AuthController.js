require('dotenv').config();
const crypto = require('crypto');
const randToken = require('rand-token');

const User = require('../models/UserModel.js');
const { hashPassword, verifyPassword, generateToken, decodeToken } = require('../method/auth/auth.method.js');
const { sendMail } = require('../utils/sendMail.js');
const { ipv4Addresses } = require('../utils/getIPAddress.js');

const currentIPv4 = ipv4Addresses.length > 0 ? ipv4Addresses[0] : '127.0.0.1';

class AuthController {
    // [POST] /auth/register
    register = async (req, res) => {
        // Check unique Email
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send({ error: 'Email already exist!' });

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
                `Please click on the following link to verify your email: http://${currentIPv4}:${process.env.PORT}/auth/verify/${user.emailVerificationToken}`,
            );

            res.status(201).json({
                data: user,
                message: 'User registered successfully. Please check your email for verification.',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    // [GET] /auth/verify:token
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

    //[POST] /auth/login
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

            // generate access token
            const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
            const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
            const dataForAccessToken = {
                userID: user._id,
            };

            const accessToken = await generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife);
            if (!accessToken) {
                return res.status(401).send('Đăng nhập không thành công, vui lòng thử lại.');
            }

            // generate refresh token
            let refreshToken = randToken.generate(32);
            if (!user.refreshToken) {
                user.refreshToken = refreshToken;
            } else {
                refreshToken = user.refreshToken;
            }
            await user.save();

            res.status(200).json({ data: user, accessToken: accessToken, refreshToken: refreshToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    //[POST] /auth/refresh
    refreshToken = async (req, res) => {
        // get access token from header
        const accessTokenFromHeader = req.headers.x_authorization;
        if (!accessTokenFromHeader) {
            return res.status(400).send('Không tìm thấy access token.');
        }

        // get refresh token from body
        const refreshTokenFromBody = req.body.refreshToken;
        if (!refreshTokenFromBody) {
            return res.status(400).send('Không tìm thấy refresh token.');
        }

        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

        // Decode access token đó
        const decoded = await decodeToken(accessTokenFromHeader, accessTokenSecret);
        if (!decoded) {
            return res.status(400).send('Access token không hợp lệ.');
        }

        const userID = decoded.payload.userID; // Lấy userID từ payload

        const user = await User.findOne({ _id: userID });
        if (!user) {
            return res.status(401).send('User không tồn tại.');
        }

        if (refreshTokenFromBody !== user.refreshToken) {
            return res.status(400).send('Refresh token không hợp lệ.');
        }

        // Tạo access token mới
        const dataForAccessToken = {
            userID,
        };

        const accessToken = await generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife);
        if (!accessToken) {
            return res.status(400).send('Tạo access token không thành công, vui lòng thử lại.');
        }
        return res.json({
            data: user,
            accessToken,
        });
    };
}

module.exports = new AuthController();
