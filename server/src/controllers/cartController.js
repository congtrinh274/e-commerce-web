// cartController.js
const db = require('../config/db').promise();

// Get cart items for a specific user
exports.getCartItems = async (req, res) => {
  const userId = req.params.userId;
  try {
    const [cartItems] = await db.query('SELECT * FROM cart WHERE user_id = ?', [userId]);

    // Extract total quantity
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    res.json({ success: true, cartItems, totalQuantity });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Add an item to the cart
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Check if the item already exists in the cart
    const [existingItem] = await db.query('SELECT * FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId]);

    if (existingItem.length > 0) {
      // If the item exists, update the quantity
      await db.query('UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?', [quantity, userId, productId]);
    } else {
      // If the item does not exist, insert a new record
      await db.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)', [userId, productId, quantity]);
    }

    res.json({ success: true, message: 'Item added to the cart successfully' });
  } catch (error) {
    console.error('Error adding item to the cart:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  try {
    // Delete the item from the cart
    await db.query('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId]);

    res.json({ success: true, message: 'Item removed from the cart successfully' });
  } catch (error) {
    console.error('Error removing item from the cart:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// ... (other code)
