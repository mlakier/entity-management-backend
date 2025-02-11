const express = require("express");
const { VendorBill } = require("../models");

const router = express.Router();

// 📌 Get All Vendor Bills
router.get("/", async (req, res) => {
    try {
        const bills = await VendorBill.findAll();
        res.json(bills);
    } catch (error) {
        res.status(500).json({ error: "Error fetching vendor bills" });
    }
});

// 📌 Get Vendor Bill by ID
router.get("/:id", async (req, res) => {
    try {
        const bill = await VendorBill.findByPk(req.params.id);
        if (!bill) return res.status(404).json({ error: "Vendor bill not found" });
        res.json(bill);
    } catch (error) {
        res.status(500).json({ error: "Error fetching vendor bill" });
    }
});

// 📌 Create Vendor Bill
router.post("/", async (req, res) => {
    try {
        const newBill = await VendorBill.create(req.body);
        res.status(201).json(newBill);
    } catch (error) {
        res.status(500).json({ error: "Error creating vendor bill" });
    }
});

// 📌 Update Vendor Bill
router.put("/:id", async (req, res) => {
    try {
        const [updated] = await VendorBill.update(req.body, { where: { bill_id: req.params.id } });
        if (!updated) return res.status(404).json({ error: "Vendor bill not found" });
        res.json({ message: "Vendor bill updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating vendor bill" });
    }
});

// 📌 Delete Vendor Bill
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await VendorBill.destroy({ where: { bill_id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: "Vendor bill not found" });
        res.json({ message: "Vendor bill deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting vendor bill" });
    }
});

module.exports = router;
