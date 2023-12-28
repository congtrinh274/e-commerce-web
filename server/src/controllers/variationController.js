const Variation = require('../models/Variation');

const variationController = {

  getAllParentCategories: async (req, res) => {
    try {
      const categories = await Variation.getAllParentCategories();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  getAllCategories: async (req, res) => {
    const { parent_category_id } = req.params;
  
    try {
      const childCategories = await Variation.getAllCategories(parent_category_id);
      res.json(childCategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  

  getAllColors: async (req, res) => {
    try {
      const colors = await Variation.getAllColors();
      res.json(colors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getAllSizes: async (req, res) => {
    try {
      const sizes = await Variation.getAllSizes();
      res.json(sizes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = variationController;
