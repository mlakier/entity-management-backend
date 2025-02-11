const express = require("express");
const { Customer } = require("../models");

const router = express.Router();

// 📌 Get All Customers
router.get("/", async (req, res) => {
    try {
        const Customers = await Customer.findAll();
        res.json(Customers);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Customers" });
    }
});

// 📌 Get Customer by ID
router.get("/:id", async (req, res) => {
    try {
        const Customer = await Customer.findByPk(req.params.id);
        if (!Customer) return res.status(404).json({ error: "Customer not found" });
        res.json(Customer);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Customer" });
    }
});

// 📌 Create Customer
router.post("/", async (req, res) => {
    try {
        const newCustomer = await Customer.create(req.body);
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ error: "Error creating Customer" });
    }
});

// 📌 Update Customer
router.put("/:id", async (req, res) => {
    try {
        const [updated] = await Customer.update(req.body, { where: { Customer_id: req.params.id } });
        if (!updated) return res.status(404).json({ error: "Customer not found" });
        res.json({ message: "Customer updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating Customer" });
    }
});

// 📌 Delete Customer
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Customer.destroy({ where: { Customer_id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: "Customer not found" });
        res.json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting Customer" });
    }
});

module.exports = router;
