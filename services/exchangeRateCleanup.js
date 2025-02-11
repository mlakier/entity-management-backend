const cron = require("node-cron");
const { ExchangeRate } = require("../models");

// Run every day at midnight (server time)
cron.schedule("0 0 * * *", async () => {
    try {
        console.log("🔄 Running exchange rate cleanup...");
        const today = new Date().toISOString().split("T")[0];

        // Delete all expired exchange rates
        const deletedRates = await ExchangeRate.destroy({
            where: {
                valid_until: { [Op.lte]: today },
            },
        });

        console.log(`🗑️ Removed ${deletedRates} expired exchange rates.`);
    } catch (error) {
        console.error("❌ Error during exchange rate cleanup:", error);
    }
});

console.log("✅ Exchange rate cleanup service initialized.");
