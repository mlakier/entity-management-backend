const express = require("express");
const { SalesOrder } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
    const orders = await SalesOrder.findAll();
    res.json(orders);
});

router.get("/:id", async (req, res) => {
    const order = await SalesOrder.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Purchase Order not found" });
    res.json(order);
});

router.post("/", async (req, res) => {
    try {
        const newOrder = await SalesOrder.create(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: "Error creating Purchase Order" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const [updated] = await SalesOrder.update(req.body, { where: { po_id: req.params.id } });
        if (!updated) return res.status(404).json({ error: "Purchase Order not found" });
        res.json({ message: "Purchase Order updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating Purchase Order" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await SalesOrder.destroy({ where: { po_id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: "Purchase Order not found" });
        res.json({ message: "Purchase Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting Purchase Order" });
    }
});

module.exports = router;
