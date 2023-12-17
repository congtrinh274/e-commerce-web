require('dotenv').config();

const User = require('../models/UserModel.js');

class UserController {
    getProfile = async (req, res) => {
        res.send(req.user);
    };
}

module.exports = new UserController();
