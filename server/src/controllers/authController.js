// controllers/authController.js
const db = require('../config/db').promise();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length === 0) {
      console.log('User not found');
      return res.status(401).json({ error: 'Login failed' });
    }

    const user = results[0];

    if (user.password) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        console.log('Login successful');
        res.status(200).json({ message: 'Login successful', user });
      } else {
        console.log('Login failed: Incorrect password');
        res.status(401).json({ error: 'Login failed' });
      }
    } else {
      console.log('Login failed: No hashed password found');
      res.status(401).json({ error: 'Login failed: No hashed password found' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      console.log('User with this email already exists');
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Save the user to the database without email verification
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = 'buyer';

    await db.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [
      email,
      hashedPassword,
      role,
    ]);

    console.log('Registration successful');
    res.status(200).json({ message: 'Registration successful. You can now login.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
