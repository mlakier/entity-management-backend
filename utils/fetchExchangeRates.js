const axios = require("axios");
const { ExchangeRate, Currency } = require("../models");

const API_KEY = process.env.EXCHANGE_RATE_API_KEY; // Store your API key in .env
const API_URL = `https://open.er-api.com/v6/latest/USD`; // API for exchange rates

// ✅ Function to Fetch and Store Exchange Rates
const fetchAndStoreExchangeRates = async () => {
  try {
    console.log("🔄 Fetching exchange rates...");
    
    const response = await axios.get(API_URL, { params: { apikey: API_KEY } });
    const rates = response.data.rates;
    const baseCurrency = response.data.base_code;

    if (!rates) {
      console.error("❌ No exchange rates found.");
      return;
    }

    // ✅ Store exchange rates in the database
    for (const [currency, rate] of Object.entries(rates)) {
      if (currency !== baseCurrency) {
        // Check if currency exists, if not, insert it
        let currencyExists = await Currency.findOne({ where: { currency_code: currency } });
        if (!currencyExists) {
          await Currency.create({
            currency_code: currency,
            currency_name: `${currency} (Auto-Generated)`,
            exchange_rate: rate,
            last_updated: new Date(),
            is_active: true,
          });
        }

        // ✅ Update or Insert Exchange Rate
        await ExchangeRate.upsert({
          base_currency: baseCurrency,
          target_currency: currency,
          exchange_rate: rate,
          rate_date: new Date(),
          source: "API",
        });
      }
    }

    console.log("✅ Exchange rates updated successfully.");
  } catch (error) {
    console.error("🔥 Error fetching exchange rates:", error);
  }
};

module.exports = fetchAndStoreExchangeRates;
