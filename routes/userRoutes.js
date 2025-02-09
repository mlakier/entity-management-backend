const express = require('express');
const { User } = require('../models'); // ✅ Ensure correct import
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Get all users (Admin only)
router.get('/', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const users = await User.findAll();
        console.log("✅ Users found:", users.length);
        res.status(200).json(users);
    } catch (error) {
        console.error("🔥 Error Fetching Users:", error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get user by ID (Admin only)
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        console.log("🔎 Requested User ID:", req.params.id);

        if (req.user.role !== 'Admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const user = await User.findByPk(req.params.id);
        if (!user) {
            console.log("❌ User Not Found in Database");
            return res.status(404).json({ error: 'User not found' });
        }

        console.log("✅ User Found:", user);
        res.status(200).json(user);
    } catch (error) {
        console.error("🔥 Error Fetching User:", error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Update a user (Admin or the user themselves)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        console.log("🔄 Updating User ID:", req.params.id);

        const user = await User.findByPk(req.params.id);
        if (!user) {
            console.log("❌ User Not Found in Database");
            return res.status(404).json({ error: 'User not found' });
        }

        // Admins can update any user, but normal users can only update themselves
        if (req.user.role !== 'Admin' && req.user.user_id !== user.user_id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        await user.update(req.body);
        console.log("✅ User Updated Successfully:", user);
        res.status(200).json(user);
    } catch (error) {
        console.error("🔥 Error Updating User:", error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Delete a user (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        console.log("❌ Deleting User ID:", req.params.id);

        if (req.user.role !== 'Admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const user = await User.findByPk(req.params.id);
        if (!user) {
            console.log("❌ User Not Found in Database");
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();
        console.log("✅ User Deleted Successfully");
        res.status(204).send();
    } catch (error) {
        console.error("🔥 Error Deleting User:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
