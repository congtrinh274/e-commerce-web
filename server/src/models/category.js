
const db = require('../config/db').promise();

const Category = {
  getAllParentCategories: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM parent_categories');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getAllChildCategories: async (parentCategoryId) => {
    try {
      const [rows] = await db.query('SELECT * FROM categories WHERE parent_category_id = ?', [parentCategoryId]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  addCategory: async (name,image) => {
    try {
      const query = 'INSERT INTO parent_categories (name,img) VALUES (?,?)';
      await db.query(query, [name,image]);
    } catch (error) {
      throw error;
    }
  },

  editCategory: async (categoryId,name,image) => {
    try {
      const query = 'UPDATE parent_categories SET name = ?, img = ? WHERE parent_category_id = ?';
      await db.query(query, [name, image, categoryId]);
      res.json({ message: 'Category edited successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      const query = 'DELETE FROM parent_categories WHERE parent_category_id = ?';
      await db.query(query, [categoryId]);
    } catch (error) {
      throw error;
    }
  },

  addChildCategory: async (parentCategoryId,name) => {
    try {
      const query = 'INSERT INTO categories (parent_category_id,name) VALUES (?, ?)';
      await db.query(query, [parentCategoryId,name]);
    } catch (error) {
      throw error;
    }
  },
  editChildCategory: async (categoryId, name) => {
    try {
      const query = 'UPDATE categories SET name = ? WHERE category_id = ?';
      await db.query(query, [name, categoryId]);
    } catch (error) {
      throw error;
    }
  },

  deleteChildCategory: async (categoryId) => {
    try {
      const query = 'DELETE FROM categories WHERE category_id = ?';
      await db.query(query, [categoryId]);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Category;
