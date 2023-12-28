
const db = require('../config/db').promise();
const Shop = {
  createShop: async (shop_name, description, user_id) => {
    try {
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
