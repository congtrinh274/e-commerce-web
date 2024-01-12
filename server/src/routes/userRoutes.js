// routes/userRoutes.js
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 * 
 * /api/users:
 *   get:
 *     summary: Get a list of users
 *     responses:
 *       '200':
 *         description: A list of users
 * 
 *   post:
 *     summary: Create a new user
 *     responses:
 *       '200':
 *         description: Successfully created a new user
 * 
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A single user
 * 
 *   put:
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully updated a user
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/seller', userController.getAllSeller);
router.get('/buyer', userController.getAllBuyer);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.post('/login', userController.loginUser);
router.get('/verify/:token', userController.verifyEmail);
router.post('/createShop', userController.createShop);

module.exports = router;
