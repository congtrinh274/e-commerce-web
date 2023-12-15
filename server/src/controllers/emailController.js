// controllers/emailController.js
const db = require('../config/db').promise();

exports.verifyEmail = async (req, res) => {
  const { email, token } = req.query;

  try {
    // Check if the user exists with the provided email and token
    const [user] = await db.query('SELECT * FROM users WHERE email = ? AND verification_token = ?', [email, token]);

    if (user.length === 0) {
      console.log('Invalid email verification token');
      return res.status(400).json({ error: 'Invalid email verification token' });
    }

    // Update the user's status to "verified" and remove the verification token
    await db.query('UPDATE users SET verified = 1, verification_token = NULL WHERE email = ?', [email]);

    console.log('Email verification successful');
    res.status(200).json({ message: 'Email verification successful. You can now log in.' });
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.confirmRegistration = async (req, res) => {
  const { email, token } = req.params;

  try {
    // Check if the user exists with the provided email and token
    const [user] = await db.query('SELECT * FROM users WHERE email = ? AND verification_token = ?', [email, token]);

    if (user.length === 0) {
      console.log('Invalid email verification token');
      return res.status(400).json({ error: 'Invalid email verification token' });
    }

    // Update the user's status to "verified" and remove the verification token
    await db.query('UPDATE users SET verified = 1, verification_token = NULL WHERE email = ?', [email]);

    console.log('Email verification successful');
    res.status(200).json({ message: 'Email verification successful. You can now log in.' });
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
