// api.js

const express = require('express');
const router = express.Router();
const db = require('./config/db').promise();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

router.get('/products', async (req, res) => {
  try {
    const [results, fields] = await db.query('SELECT * FROM products');
    res.json(results);
  } catch (error) {
    console.error('Error fetching products: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/products/:productId', async (req, res) => {
  const productId = req.params.productId;
  console.log('Fetching product by ID:', productId);

  try {
    const [results, fields] = await db.query('SELECT * FROM products WHERE product_id = ?', [productId]);

    if (results.length === 0) {
      console.log(`Product with ID ${productId} not found`);
      res.status(404).json({ error: 'Product not found' });
    } else {
      console.log(`Product with ID ${productId} found`);
      res.json(results[0]);
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}: `, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [results, fields] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length === 0) {
      console.log('User not found');
      return res.status(401).json({ error: 'Login failed' });
    }

    const user = results[0];

    // Ensure user has a hashed password before comparing
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
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Generate a unique verification token
    const verificationToken = uuidv4();

    // Send email verification link
    const verificationLink = `http://localhost:3001/api/verify-email?email=${email}&token=${verificationToken}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      secure: true,
    });
    

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      text: `Click on the following link to verify your email: ${verificationLink}`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Email sent:', info.response);

        // Save the user to the database with the verification token
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = 'buyer';

        await db.query('INSERT INTO users (email, password, role, verification_token) VALUES (?, ?, ?, ?)', [
          email,
          hashedPassword,
          role,
          verificationToken,
        ]);

        console.log('Registration successful');
        res.status(200).json({ message: 'Registration successful. Check your email for verification.' });
      }
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/verify-email', async (req, res) => {
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
});

module.exports = router;
