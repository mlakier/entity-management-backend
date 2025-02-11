const express = require("express");
const { VendorBillLine } = require("../models");

const router = express.Router();

// 📌 Get All Vendor Bill Lines
router.get("/", async (req, res) => {
    try {
        const lines = await VendorBillLine.findAll();
        res.json(lines);
    } catch (error) {
        res.status(500).json({ error: "Error fetching vendor bill lines" });
    }
});

// 📌 Get Vendor Bill Line by ID
router.get("/:id", async (req, res) => {
    try {
        const line = await VendorBillLine.findByPk(req.params.id);
        if (!line) return res.status(404).json({ error: "Vendor bill line not found" });
        res.json(line);
    } catch (error) {
        res.status(500).json({ error: "Error fetching vendor bill line" });
    }
});

// 📌 Create Vendor Bill Line
router.post("/", async (req, res) => {
    try {
        const newLine = await VendorBillLine.create(req.body);
        res.status(201).json(newLine);
    } catch (error) {
        res.status(500).json({ error: "Error creating vendor bill line" });
    }
});

// 📌 Update Vendor Bill Line
router.put("/:id", async (req, res) => {
    try {
        const [updated] = await VendorBillLine.update(req.body, { where: { line_id: req.params.id } });
        if (!updated) return res.status(404).json({ error: "Vendor bill line not found" });
        res.json({ message: "Vendor bill line updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating vendor bill line" });
    }
});

// 📌 Delete Vendor Bill Line
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await VendorBillLine.destroy({ where: { line_id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: "Vendor bill line not found" });
        res.json({ message: "Vendor bill line deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting vendor bill line" });
    }
});

module.exports = router;
