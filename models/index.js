'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require("../config/config.json")["development"];

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

const db = {};

// Import models
db.Currency = require("./currency")(sequelize, DataTypes);
db.ExchangeRate = require("./exchangeRate")(sequelize, DataTypes);
db.GL_Account = require("./glAccount")(sequelize, DataTypes);
db.Entity = require("./entity")(sequelize, DataTypes);
db.Vendor = require("./vendor")(sequelize, DataTypes);
db.VendorBill = require("./vendorBill")(sequelize, DataTypes);
db.VendorBillLine = require("./vendorBillLine")(sequelize, DataTypes);
db.Customer = require("./customer")(sequelize, DataTypes);
db.CustomerInvoice = require("./customerInvoice")(sequelize, DataTypes);
db.CustomerInvoiceLine = require("./customerInvoiceLine")(sequelize, DataTypes);
db.JournalEntry = require("./journalEntry")(sequelize, DataTypes);
db.JournalEntryLine = require("./journalEntryLine")(sequelize, DataTypes); // ✅ Renamed from JournalLine.js

// ✅ Define Associations

// 🎯 **Currency and Exchange Rate Associations**
db.Currency.hasMany(db.ExchangeRate, { foreignKey: "base_currency", as: "BaseCurrencyRates" });
db.Currency.hasMany(db.ExchangeRate, { foreignKey: "target_currency", as: "TargetCurrencyRates" });
db.ExchangeRate.belongsTo(db.Currency, { foreignKey: "base_currency", as: "BaseCurrency" });
db.ExchangeRate.belongsTo(db.Currency, { foreignKey: "target_currency", as: "TargetCurrency" });

// 🎯 **General Ledger (GL) Account Associations**
db.GL_Account.belongsTo(db.Currency, { foreignKey: "currency", targetKey: "currency_code" });
db.GL_Account.belongsTo(db.Entity, { foreignKey: "entity_id" });

// 🎯 **Vendor & Vendor Bill Associations**
db.Vendor.belongsTo(db.Entity, { foreignKey: "entity_id" });
db.VendorBill.belongsTo(db.Vendor, { foreignKey: "vendor_id" });
db.VendorBill.belongsTo(db.Entity, { foreignKey: "entity_id" });
db.VendorBill.belongsTo(db.Currency, { foreignKey: "base_currency", targetKey: "currency_code" });
db.VendorBill.hasMany(db.VendorBillLine, { foreignKey: "bill_id", onDelete: "CASCADE" });
db.VendorBillLine.belongsTo(db.VendorBill, { foreignKey: "bill_id" });
db.VendorBillLine.belongsTo(db.Entity, { foreignKey: "entity_id" });
db.VendorBillLine.belongsTo(db.GL_Account, { foreignKey: "expense_account_id" });

// 🎯 **Customer & Customer Invoice Associations**
db.Customer.belongsTo(db.Entity, { foreignKey: "entity_id" });
db.CustomerInvoice.belongsTo(db.Customer, { foreignKey: "customer_id" });
db.CustomerInvoice.belongsTo(db.Entity, { foreignKey: "entity_id" });
db.CustomerInvoice.belongsTo(db.Currency, { foreignKey: "base_currency", targetKey: "currency_code" });
db.CustomerInvoice.hasMany(db.CustomerInvoiceLine, { foreignKey: "invoice_id", onDelete: "CASCADE" });
db.CustomerInvoiceLine.belongsTo(db.CustomerInvoice, { foreignKey: "invoice_id" });
db.CustomerInvoiceLine.belongsTo(db.Entity, { foreignKey: "entity_id" });
db.CustomerInvoiceLine.belongsTo(db.GL_Account, { foreignKey: "revenue_account_id" });

// 🎯 **Journal Entry & Journal Entry Line Associations**
db.JournalEntry.belongsTo(db.Entity, { foreignKey: "entity_id" });
db.JournalEntry.belongsTo(db.Currency, { foreignKey: "base_currency", targetKey: "currency_code" });
db.JournalEntry.hasMany(db.JournalEntryLine, { foreignKey: "entry_id", onDelete: "CASCADE" });
db.JournalEntryLine.belongsTo(db.JournalEntry, { foreignKey: "entry_id" });
db.JournalEntryLine.belongsTo(db.GL_Account, { foreignKey: "account_id" });
db.JournalEntryLine.belongsTo(db.Entity, { foreignKey: "entity_id" });

// Read model files dynamically and initialize them
fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== "index.js" && file.slice(-3) === '.js')
  .forEach(file => {
    const modelDef = require(path.join(__dirname, file)); // Import model function
    const model = modelDef(sequelize, DataTypes); // Initialize the model
    db[model.name] = model;
  });

// Apply associations if they exist
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
