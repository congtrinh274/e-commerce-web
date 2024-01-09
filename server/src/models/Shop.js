const db = require('../config/db').promise();
const Shop = {
  createShop: async (shop_name, description, user_id) => {
    try {
      // Kiểm tra xem 'shop_name' đã tồn tại chưa
      const [existingShop] = await db.query(
        'SELECT * FROM shops WHERE shop_name = ?',
        [shop_name]
      );

      if (existingShop.length > 0) {
        // Nếu 'shop_name' đã tồn tại, bạn có thể xử lý theo cách phù hợp, ví dụ như thông báo lỗi
        throw new Error('Tên cửa hàng đã tồn tại');
      }

      const [result] = await db.query(
        'INSERT INTO shops (shop_name, description, user_id) VALUES (?, ?, ?)',
        [shop_name, description, user_id]
      );

      return { shop_name, description, user_id };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Shop;
