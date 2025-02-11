const express = require("express");
const { Vendor } = require("../models");

const router = express.Router();

// 📌 Get All Vendors
router.get("/", async (req, res) => {
    try {
        const vendors = await Vendor.findAll();
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ error: "Error fetching vendors" });
    }
});

// 📌 Get Vendor by ID
router.get("/:id", async (req, res) => {
    try {
        const vendor = await Vendor.findByPk(req.params.id);
        if (!vendor) return res.status(404).json({ error: "Vendor not found" });
        res.json(vendor);
    } catch (error) {
        res.status(500).json({ error: "Error fetching vendor" });
    }
});

// 📌 Create Vendor
router.post("/", async (req, res) => {
    try {
        const newVendor = await Vendor.create(req.body);
        res.status(201).json(newVendor);
    } catch (error) {
        res.status(500).json({ error: "Error creating vendor" });
    }
});

// 📌 Update Vendor
router.put("/:id", async (req, res) => {
    try {
        const [updated] = await Vendor.update(req.body, { where: { vendor_id: req.params.id } });
        if (!updated) return res.status(404).json({ error: "Vendor not found" });
        res.json({ message: "Vendor updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating vendor" });
    }
});

// 📌 Delete Vendor
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Vendor.destroy({ where: { vendor_id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: "Vendor not found" });
        res.json({ message: "Vendor deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting vendor" });
    }
});

module.exports = router;
