const express = require("express");
const router = express.Router();
const { Tax } = require("../models");

// 📌 GET all Taxes
router.get("/", async (req, res) => {
  try {
    const taxes = await Tax.findAll();
    res.json(taxes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching taxes" });
  }
});

// 📌 GET Tax by ID
router.get("/:id", async (req, res) => {
  try {
    const tax = await Tax.findByPk(req.params.id);
    if (!tax) return res.status(404).json({ error: "Tax not found" });
    res.json(tax);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tax" });
  }
});

// 📌 CREATE a new Tax
router.post("/", async (req, res) => {
  try {
    const { tax_name, tax_rate, tax_code, description } = req.body;
    const newTax = await Tax.create({ tax_name, tax_rate, tax_code, description });
    res.status(201).json(newTax);
  } catch (error) {
    res.status(500).json({ error: "Error creating tax" });
  }
});

// 📌 UPDATE an existing Tax
router.put("/:id", async (req, res) => {
  try {
    const tax = await Tax.findByPk(req.params.id);
    if (!tax) return res.status(404).json({ error: "Tax not found" });

    await tax.update(req.body);
    res.json({ message: "Tax updated successfully", tax });
  } catch (error) {
    res.status(500).json({ error: "Error updating tax" });
  }
});

// 📌 DELETE a Tax
router.delete("/:id", async (req, res) => {
  try {
    const tax = await Tax.findByPk(req.params.id);
    if (!tax) return res.status(404).json({ error: "Tax not found" });

    await tax.destroy();
    res.json({ message: "Tax deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting tax" });
  }
});

module.exports = router;
