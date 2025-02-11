require('dotenv').config();
require("./services/exchangeRateCleanup"); // Start automated cleanup

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const entityRoutes = require('./routes/entityRoutes');
const currencyRoutes = require("./routes/currencyRoutes");
const exchangeRateRoutes = require("./routes/exchangeRateRoutes");
const fetchAndStoreExchangeRates = require("./utils/fetchExchangeRates");
const cron = require("node-cron");
const glAccountRoutes = require("./routes/glAccountRoutes"); // ✅ Import GL Account routes

const app = express();

// Schedule exchange rate updates every 12 hours
cron.schedule("0 */12 * * *", async () => {
    console.log("⏳ Running scheduled exchange rate update...");
    await fetchAndStoreExchangeRates();
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/entities', entityRoutes);
app.use("/api/currencies", currencyRoutes);
app.use("/api/exchange-rates", exchangeRateRoutes);
app.use("/api/gl-accounts", glAccountRoutes); // ✅ Register the route

// Home Route
app.get('/', (req, res) => {
    res.json({ message: "🚀 Welcome to the Entity Management API!" });
});

// Ensure we do not create multiple instances when running tests
if (!module.parent) {
    const PORT = process.env.PORT || 5000;
    sequelize.sync({ force: false })
        .then(() => {
            console.log("✅ Database connected and models are synced.");
            app.listen(PORT, () => {
                console.log(`🚀 Server running on port ${PORT}`);
            });
        })
        .catch((err) => {
            console.error("❌ Database connection error:", err);
        });
}

module.exports = app; // ✅ Ensure the app is exportable for tests
