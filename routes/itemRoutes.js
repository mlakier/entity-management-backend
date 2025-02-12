const express = require("express");
const router = express.Router();
const { Item } = require("../models");

// ✅ Create Item
router.post("/", async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    console.error("🔥 Error creating item:", error);
    res.status(500).json({ error: "Failed to create item." });
  }
});

// ✅ Get All Items
router.get("/", async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    console.error("🔥 Error fetching items:", error);
    res.status(500).json({ error: "Failed to fetch items." });
  }
});

// ✅ Get Item by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found." });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error("🔥 Error fetching item:", error);
    res.status(500).json({ error: "Failed to fetch item." });
  }
});

// ✅ Update Item
router.put("/:id", async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found." });
    }
    await item.update(req.body);
    res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    console.error("🔥 Error updating item:", error);
    res.status(500).json({ error: "Failed to update item." });
  }
});

// ✅ Delete Item
router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found." });
    }
    await item.destroy();
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("🔥 Error deleting item:", error);
    res.status(500).json({ error: "Failed to delete item." });
  }
});

module.exports = router;
