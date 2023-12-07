// middleware/authMiddleware.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

const generateToken = (userId) => {
    const secret = 'auth-token';
    return jwt.sign({ userId }, secret, { expiresIn: '1h' });
};

module.exports = { hashPassword, verifyPassword, generateToken };
