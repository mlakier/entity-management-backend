const express = require("express");
const { JournalEntry } = require("../models");

const router = express.Router();

// 📌 Get All Journal Entries
router.get("/", async (req, res) => {
    try {
        const entries = await JournalEntry.findAll();
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: "Error fetching journal entries" });
    }
});

// 📌 Get Journal Entry by ID
router.get("/:id", async (req, res) => {
    try {
        const entry = await JournalEntry.findByPk(req.params.id);
        if (!entry) return res.status(404).json({ error: "Journal entry not found" });
        res.json(entry);
    } catch (error) {
        res.status(500).json({ error: "Error fetching journal entry" });
    }
});

// 📌 Create Journal Entry
router.post("/", async (req, res) => {
    try {
        const newEntry = await JournalEntry.create(req.body);
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).json({ error: "Error creating journal entry" });
    }
});

// 📌 Update Journal Entry
router.put("/:id", async (req, res) => {
    try {
        const [updated] = await JournalEntry.update(req.body, { where: { entry_id: req.params.id } });
        if (!updated) return res.status(404).json({ error: "Journal entry not found" });
        res.json({ message: "Journal entry updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating journal entry" });
    }
});

// 📌 Delete Journal Entry
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await JournalEntry.destroy({ where: { entry_id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: "Journal entry not found" });
        res.json({ message: "Journal entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting journal entry" });
    }
});

module.exports = router;
