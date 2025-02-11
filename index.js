require('dotenv').config();
require("./services/exchangeRateCleanup"); // Start automated cleanup

// Import Routes
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
const glAccountRoutes = require("./routes/glAccountRoutes");
const journalEntryRoutes = require("./routes/journalEntryRoutes");
const journalEntryLineRoutes = require("./routes/journalEntryLineRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const vendorBillRoutes = require("./routes/vendorBillRoutes");
const vendorBillLineRoutes = require("./routes/vendorBillLineRoutes");
const customerRoutes = require("./routes/customerRoutes");
const customerInvoiceRoutes = require("./routes/customerInvoiceRoutes");
const customerInvoiceLineRoutes = require("./routes/customerInvoiceLineRoutes");
const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes");
const purchaseOrderLineRoutes = require("./routes/purchaseOrderLineRoutes");
const salesOrderRoutes = require("./routes/salesOrderRoutes");
const salesOrderLineRoutes = require("./routes/salesOrderLineRoutes");

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

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/entities', entityRoutes);
app.use("/api/currencies", currencyRoutes);
app.use("/api/exchange-rates", exchangeRateRoutes);
app.use("/api/gl-accounts", glAccountRoutes);
app.use("/api/journal-entries", journalEntryRoutes);
app.use("/api/journal-entries-lines", journalEntryLineRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/vendor-bills", vendorBillRoutes);
app.use("/api/vendor-bill-lines", vendorBillLineRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/customer-invoices", customerInvoiceRoutes);
app.use("/api/customer-invoices-lines", customerInvoiceLineRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);
app.use("/api/purchase-order-lines", purchaseOrderLineRoutes);
app.use("/api/sales-orders", salesOrderRoutes);
app.use("/api/sales-order-lines", salesOrderLineRoutes);

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
