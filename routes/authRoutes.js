require('dotenv').config(); // ✅ Load environment variables
const express = require('express');
const bcrypt = require('bcryptjs'); // ✅ Ensure bcryptjs is installed
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // ✅ Correctly import User model

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// ✅ Register a new user
router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password, role, created_by } = req.body;

        // Check if email is already in use
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role: role || 'user', // Default role is "user"
            created_by,
            updated_by: created_by
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
});

// ✅ Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate JWT Token
        const token = jwt.sign(
            { user_id: user.user_id, role: user.role },
            SECRET_KEY, // ✅ Securely stored secret key
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
});

module.exports = router;
