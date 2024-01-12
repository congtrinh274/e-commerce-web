const db = require('../config/db').promise();

const Variation = {
  getAllParentCategories: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM parent_categories');
      return rows;
    } catch (error) {
      throw error;
    }
  },
  getAllChildCategories: async (parent_category_id) => {
    try {
      const [rows] = await db.query('SELECT * FROM categories WHERE parent_category_id = ?', [parent_category_id]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getAllColors: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM colors');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getAllSizes: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM sizes');
      return rows;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Variation;
