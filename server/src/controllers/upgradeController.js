const db = require('../config/db').promise();

exports.upgradeRole = async (req, res) => {
  const { userId, storeName } = req.body;

  try {
    if (!userId || !storeName) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }

    const [result] = await db.execute(
      'UPDATE users SET role = ?, shop_name = ? WHERE user_id = ?',
      ['seller', storeName, userId]
    );

    if (result.affectedRows > 0) {
      console.log('Successfully upgraded role for User ID:', userId);
      res.json({ success: true });
    } else {
      console.log('User not found with User ID:', userId);
      res.status(404).json({ success: false, error: 'User not found' });
    }
  } catch (error) {
    console.error('Error upgrading role:', error);
    console.error('SQL Query:', 'UPDATE users SET role = ?, shop_name = ? WHERE user_id = ?', ['seller', storeName, userId]);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
