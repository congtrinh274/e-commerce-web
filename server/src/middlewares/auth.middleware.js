const User = require('../models/UserModel.js');

const { verifyToken } = require('../method/auth/auth.method.js');

const isAuth = async (req, res, next) => {
    // Lấy access token từ header
    const accessTokenFromHeader = req.headers.x_authorization;
    if (!accessTokenFromHeader) {
        return res.status(401).send('Không tìm thấy access token!');
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const verified = await verifyToken(accessTokenFromHeader, accessTokenSecret);
    if (!verified) {
        return res.status(401).send('Bạn không có quyền truy cập vào tính năng này!');
    }

    const user = await User.findOne({ _id: verified.payload.userID });
    req.user = user;

    return next();
};

module.exports = { isAuth };
