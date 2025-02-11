const express = require("express");
const router = express.Router();
const { Currency } = require("../models");

// ✅ GET all currencies
router.get("/", async (req, res) => {
  try {
    const currencies = await Currency.findAll();
    res.status(200).json(currencies);
  } catch (error) {
    console.error("🔥 Error fetching currencies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ POST: Add a new currency
router.post("/", async (req, res) => {
  try {
    const { currency_code, currency_name, exchange_rate, is_active } = req.body;
    const newCurrency = await Currency.create({
      currency_code,
      currency_name,
      exchange_rate,
      is_active: is_active ?? true,
    });
    res.status(201).json(newCurrency);
  } catch (error) {
    console.error("🔥 Error adding currency:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ PUT: Update exchange rate of a currency
router.put("/:currency_code", async (req, res) => {
  try {
    const { currency_code } = req.params;
    const { exchange_rate, is_active } = req.body;
    const currency = await Currency.findByPk(currency_code);

    if (!currency) {
      return res.status(404).json({ error: "Currency not found" });
    }

    currency.exchange_rate = exchange_rate ?? currency.exchange_rate;
    currency.is_active = is_active ?? currency.is_active;
    currency.last_updated = new Date();
    await currency.save();

    res.status(200).json({ message: "Currency updated successfully", currency });
  } catch (error) {
    console.error("🔥 Error updating currency:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ DELETE: Deactivate currency
router.delete("/:currency_code", async (req, res) => {
  try {
    const { currency_code } = req.params;
    const currency = await Currency.findByPk(currency_code);

    if (!currency) {
      return res.status(404).json({ error: "Currency not found" });
    }

    currency.is_active = false;
    await currency.save();

    res.status(200).json({ message: "Currency deactivated successfully" });
  } catch (error) {
    console.error("🔥 Error deactivating currency:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Delete a GL Account by account_id
router.delete("/:account_id", async (req, res) => {
  const { account_id } = req.params;

  try {
    console.log(`🔹 Deleting GL Account ID: ${account_id}`); // ✅ Debug log

    // Find the GL Account by ID
    const account = await GL_Account.findByPk(account_id);
    if (!account) {
      return res.status(404).json({ error: "GL Account not found" });
    }

    // Delete the record
    await account.destroy();

    res.status(200).json({
      message: "GL Account deleted successfully",
    });
  } catch (error) {
    console.error("🔥 Error deleting GL Account:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
