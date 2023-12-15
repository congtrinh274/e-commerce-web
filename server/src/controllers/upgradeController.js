const db = require('../config/db').promise();

exports.upgradeRole = async (req, res) => {
  const { userId, storeName } = req.body;

  try {
    if (!userId || !storeName) {
      return res.status(400).json({ error: 'Tham số yêu cầu không hợp lệ' });
    }

    const [result] = await db.execute(
      'UPDATE users SET role = ?, shop_name = ? WHERE user_id = ?',
      ['seller', storeName, userId]
    );

    if (result.affectedRows > 0) {
      console.log('Nâng cấp vai trò thành công cho User ID:', userId);
      res.json({ success: true });
    } else {
      console.log('Không tìm thấy người dùng với User ID:', userId);
      res.status(404).json({ success: false, error: 'Không tìm thấy người dùng' });
    }
  } catch (error) {
    console.error('Lỗi khi nâng cấp vai trò:', error);
    console.error('SQL Query:', 'UPDATE users SET role = ?, shop_name = ? WHERE user_id = ?', ['seller', storeName, userId]);
    res.status(500).json({ success: false, error: 'Lỗi Nội Bộ của Máy Chủ' });
  }
};
