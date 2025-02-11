const express = require("express");
const { JournalEntryLine } = require("../models");

const router = express.Router();

// 📌 Get All Journal Entry Lines
router.get("/", async (req, res) => {
    try {
        const lines = await JournalEntryLine.findAll();
        res.json(lines);
    } catch (error) {
        res.status(500).json({ error: "Error fetching journal entry lines" });
    }
});

// 📌 Get Journal Entry Line by ID
router.get("/:id", async (req, res) => {
    try {
        const line = await JournalEntryLine.findByPk(req.params.id);
        if (!line) return res.status(404).json({ error: "Journal entry line not found" });
        res.json(line);
    } catch (error) {
        res.status(500).json({ error: "Error fetching journal entry line" });
    }
});

// 📌 Create Journal Entry Line
router.post("/", async (req, res) => {
    try {
        const newLine = await JournalEntryLine.create(req.body);
        res.status(201).json(newLine);
    } catch (error) {
        res.status(500).json({ error: "Error creating journal entry line" });
    }
});

// 📌 Update Journal Entry Line
router.put("/:id", async (req, res) => {
    try {
        const [updated] = await JournalEntryLine.update(req.body, { where: { line_id: req.params.id } });
        if (!updated) return res.status(404).json({ error: "Journal entry line not found" });
        res.json({ message: "Journal entry line updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating journal entry line" });
    }
});

// 📌 Delete Journal Entry Line
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await JournalEntryLine.destroy({ where: { line_id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: "Journal entry line not found" });
        res.json({ message: "Journal entry line deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting journal entry line" });
    }
});

module.exports = router;
