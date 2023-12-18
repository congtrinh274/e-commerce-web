require('dotenv').config();

const User = require('../models/UserModel');

class UserController {
    getProfile = async (req, res) => {
        res.send(req.user);
    };
}

module.exports = new UserController();
