const express = require('express');
const Entity = require('../models/entity'); // ✅ Ensure correct import
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Get all entities (Requires authentication)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const entities = await Entity.findAll();
        console.log("✅ Entities found:", entities.length);
        res.status(200).json(entities);
    } catch (error) {
        console.error("🔥 Error Fetching Entities:", error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get entity by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        console.log("🔎 Requested Entity ID:", req.params.id);

        const entity = await Entity.findByPk(req.params.id);
        if (!entity) {
            console.log("❌ Entity Not Found in Database");
            return res.status(404).json({ error: 'Entity not found' });
        }

        console.log("✅ Entity Found:", entity);
        res.status(200).json(entity);
    } catch (error) {
        console.error("🔥 Error Fetching Entity:", error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Create a new entity (Admin only)
router.post('/', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const newEntity = await Entity.create(req.body);
        res.status(201).json(newEntity);
    } catch (error) {
        console.error("🔥 Error Creating Entity:", error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Update an entity (Admin only) - FIXED to return expected response format
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const entity = await Entity.findByPk(req.params.id);
        if (!entity) return res.status(404).json({ error: 'Entity not found' });

        await entity.update(req.body);
        res.status(200).json({ message: "Entity updated successfully" }); // ✅ Fix response format
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Delete an entity (Admin only) - FIXED to return expected response format
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const entity = await Entity.findByPk(req.params.id);
        if (!entity) return res.status(404).json({ error: 'Entity not found' });

        await entity.destroy();
        res.status(200).json({ message: "Entity deleted successfully" }); // ✅ Fix response format
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
