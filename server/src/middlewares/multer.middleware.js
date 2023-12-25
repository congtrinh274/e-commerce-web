const multer = require('multer');

// Thiết lập nơi lưu trữ và tên tệp tin
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Thư mục lưu trữ tệp tin
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Tên tệp tin
    },
});

// Middleware Multer
const upload = multer({ storage: storage });

module.exports = upload;
