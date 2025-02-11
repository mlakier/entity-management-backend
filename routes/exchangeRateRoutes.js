const express = require("express");
const router = express.Router();
const { ExchangeRate, Currency } = require("../models");
const fetchAndStoreExchangeRates = require("../utils/fetchExchangeRates");
const { Op } = require("sequelize");

// ✅ API to Manually Trigger Exchange Rate Update
router.get("/update", async (req, res) => {
  try {
    await fetchAndStoreExchangeRates();
    res.json({ message: "Exchange rates updated successfully." });
  } catch (error) {
    console.error("🔥 Error updating exchange rates:", error);
    res.status(500).json({ error: "Failed to update exchange rates." });
  }
});

// 📌 Convert currency amount based on the latest exchange rate
router.get("/convert", async (req, res) => {
  try {
    const { base_currency, target_currency, amount } = req.query;

    if (!base_currency || !target_currency || !amount) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // Ensure amount is a number
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      return res.status(400).json({ error: "Invalid amount provided" });
    }

    // 🔍 Fetch the latest exchange rate
    const exchangeRate = await ExchangeRate.findOne({
      where: {
        base_currency,
        target_currency
      },
      order: [["rate_date", "DESC"]] // ✅ Get the most recent exchange rate
    });

    if (!exchangeRate) {
      return res.status(404).json({ error: "No exchange rate found for the given currency pair" });
    }

    // 💱 Convert amount
    const convertedAmount = amountValue * exchangeRate.exchange_rate;

    res.json({
      base_currency,
      target_currency,
      amount: amountValue,
      exchange_rate: exchangeRate.exchange_rate,
      converted_amount: convertedAmount.toFixed(2),
      rate_date: exchangeRate.rate_date
    });
  } catch (error) {
    console.error("🔥 Error converting currency:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ POST: Add new exchange rate
router.post("/", async (req, res) => {
  try {
      const { base_currency, target_currency, exchange_rate, rate_date, manual_override, valid_until } = req.body;

      const newRate = await ExchangeRate.create({
          base_currency,
          target_currency,
          exchange_rate,
          rate_date: rate_date || new Date(),
          valid_until: valid_until || new Date(new Date().setDate(new Date().getDate() + 30)), // Default to 30 days if not provided
          source: manual_override ? "manual_override" : "api",
          manual_override: manual_override || false,
      });

      res.status(201).json(newRate);
  } catch (error) {
      console.error("🔥 Error adding exchange rate:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
