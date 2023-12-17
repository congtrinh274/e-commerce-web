// middleware/authMiddleware.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

const generateToken = async (payload, accessTokenSecret, accessTokenLife) => {
    try {
        return await sign(
            {
                payload,
            },
            accessTokenSecret,
            {
                algorithm: 'HS256',
                expiresIn: accessTokenLife,
            },
        );
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
};
const decodeToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey, {
            ignoreExpiration: true,
        });
    } catch (error) {
        console.log(`Error in decode access token: ${error}`);
        return null;
    }
};

const verifyToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey);
    } catch (error) {
        console.log(`Error in verify access token:  + ${error}`);
        return null;
    }
};

module.exports = { hashPassword, verifyPassword, generateToken, decodeToken, verifyToken };
