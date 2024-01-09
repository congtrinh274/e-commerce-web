const Category = require('../models/category');

const categoriesController = {
  getAllParentCategories: async (req, res) => {
    try {
      const parentCategories = await Category.getAllParentCategories();
      res.json(parentCategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getAllChildCategories: async (req, res) => {
    const { parentCategoryId } = req.params;

    try {
      const childCategories = await Category.getAllChildCategories(parentCategoryId);
      res.json(childCategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  addCategory: async (req, res) => {
    const { name } = req.body;

    try {
      await Category.addCategory(name);
      res.status(201).json({ message: 'Category added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  editCategory: async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;

    try {
      await Category.editCategory(categoryId, name);
      res.json({ message: 'Category edited successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteCategory: async (req, res) => {
    const { categoryId } = req.params;
    try {
      await Category.deleteCategory(categoryId);
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  addChildCategory: async (req, res) => {
    const { parentCategoryId, name } = req.body;

    try {
      await Category.addChildCategory(parentCategoryId, name);
      res.status(201).json({ message: 'Child category added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  editChildCategory: async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;

    try {
      await Category.editChildCategory(categoryId, name);
      res.json({ message: 'Child category edited successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteChildCategory: async (req, res) => {
    const { categoryId } = req.params;

    try {
      await Category.deleteChildCategory(categoryId);
      res.json({ message: 'Child category deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = categoriesController;