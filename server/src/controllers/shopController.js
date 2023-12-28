const db = require('../config/db').promise();

exports.checkShopAvailability = async (req, res) => {
  const { storeName } = req.query;

  if (!storeName) {
    return res.status(400).json({ error: 'Store name is required.' });
  }

  try {
    const [existingShop] = await db.query('SELECT * FROM users WHERE shop_name = ?', [storeName]);

    const isAvailable = existingShop.length === 0;

    res.json({ available: isAvailable });
  } catch (error) {
    console.error('Error checking shop name availability:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
