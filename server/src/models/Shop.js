const db = require('../config/db').promise();
const Shop = {
  createShop: async (shop_name, description, user_id) => {
    try {
      const [existingShop] = await db.query(
        'SELECT * FROM shops WHERE shop_name = ?',
        [shop_name]
      );
      if (existingShop.length > 0) {
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
