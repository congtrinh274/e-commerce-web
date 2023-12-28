// models/User.js
const db = require('../config/db').promise();

const User = {
    getAllUsers: async () => {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    },
    getUserById: async (userId) => {
        const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);
        return rows[0];
    },
    getUserByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },
    createUser: async (email, password, role, verificationToken) => {
        const [result] = await db.query('INSERT INTO users (email, password, role,verification_token) VALUES (?, ?, ?, ?)', [email, password, role, verificationToken]);
        return result.insertId;
    },

    updateUser: async (userId, email, password, role) => {
        await db.query('UPDATE users SET email = ?, password = ?, role = ? WHERE user_id = ?', [email, password, role, userId]);
    },
    getUserByVerificationToken: async (verificationToken) => {
        const [rows] = await db.query('SELECT * FROM users WHERE verification_token = ?', [verificationToken]);
        return rows[0];
    },
    verifyUser: async (userId) => {
        await db.query('UPDATE users SET is_verified = true WHERE user_id = ?', [userId]);
    },
    updateUserRole: async (userId, newRole) => {
        try {
            await db.query('UPDATE users SET role = ? WHERE user_id = ?', [newRole, userId]);
        } catch (error) {
            throw error;
        }
    },
};

module.exports = User;
