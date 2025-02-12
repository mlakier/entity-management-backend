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
db.Item = require("./item")(sequelize, DataTypes);
db.Vendor = require("./vendor")(sequelize, DataTypes);
db.Customer = require("./customer")(sequelize, DataTypes);
db.Tax = require("./tax")(sequelize, DataTypes);

db.SalesOrder = require("./salesOrder")(sequelize, DataTypes);
db.SalesOrderLine = require("./salesOrderLine")(sequelize, DataTypes);
db.PurchaseOrder = require("./purchaseOrder")(sequelize, DataTypes);
db.PurchaseOrderLine = require("./purchaseOrderLine")(sequelize, DataTypes);
db.VendorBill = require("./vendorBill")(sequelize, DataTypes);
db.VendorBillLine = require("./vendorBillLine")(sequelize, DataTypes);
db.CustomerInvoice = require("./customerInvoice")(sequelize, DataTypes);
db.CustomerInvoiceLine = require("./customerInvoiceLine")(sequelize, DataTypes);
db.JournalEntry = require("./journalEntry")(sequelize, DataTypes);
db.JournalEntryLine = require("./journalEntryLine")(sequelize, DataTypes); // ✅ Renamed from JournalLine.js

// ✅ Define Associations

// 🎯 **Currency and Exchange Rate Associations**
db.Currency.hasMany(db.ExchangeRate, { foreignKey: "base_currency", as: "BaseCurrencyRates" });
db.Currency.hasMany(db.ExchangeRate, { foreignKey: "target_currency", as: "TargetCurrencyRates" });
db.ExchangeRate.belongsTo(db.Currency, { foreignKey: "base_currency", as: "BaseCurrencyRef" });
db.ExchangeRate.belongsTo(db.Currency, { foreignKey: "target_currency", as: "TargetCurrencyRef" });

// 🎯 **General Ledger (GL) Account Associations**
db.GL_Account.belongsTo(db.Currency, { foreignKey: "currency", targetKey: "currency_code" });
db.GL_Account.belongsTo(db.Entity, { foreignKey: "entity_id" });

// 🎯 **Entity Associations**
db.Entity.hasMany(db.Customer, { foreignKey: "entity_id" });
db.Entity.hasMany(db.Vendor, { foreignKey: "entity_id" });
db.Entity.hasMany(db.SalesOrder, { foreignKey: "entity_id" });
db.Entity.hasMany(db.PurchaseOrder, { foreignKey: "entity_id" });
db.Entity.hasMany(db.VendorBill, { foreignKey: "entity_id" });
db.Entity.hasMany(db.CustomerInvoice, { foreignKey: "entity_id" });
db.Entity.hasMany(db.JournalEntry, { foreignKey: "entity_id" });
db.Entity.hasMany(db.Item, { foreignKey: "entity_id" });
db.Entity.hasMany(db.Tax, { foreignKey: "entity_id" }); // ✅ Added

// 🎯 **Entity Line Associations**
db.Entity.hasMany(db.JournalEntryLine, { foreignKey: "entity_id" }); // ✅ Added
db.Entity.hasMany(db.VendorBillLine, { foreignKey: "entity_id" }); // ✅ Added
db.Entity.hasMany(db.CustomerInvoiceLine, { foreignKey: "entity_id" }); // ✅ Added
db.Entity.hasMany(db.PurchaseOrderLine, { foreignKey: "entity_id" }); // ✅ Added
db.Entity.hasMany(db.SalesOrderLine, { foreignKey: "entity_id" }); // ✅ Added

// 🎯 **Vendor Associations**
db.Vendor.belongsTo(db.Entity, { foreignKey: "entity_id" });

// 🎯 **Customer Associations**
db.Customer.belongsTo(db.Entity, { foreignKey: "entity_id" });

// ✅ Sales Orders Associations**
db.SalesOrder.belongsTo(db.Customer, { foreignKey: "customer_id" });
db.SalesOrder.belongsTo(db.Entity, { foreignKey: "entity_id" });
db.SalesOrder.hasMany(db.SalesOrderLine, { foreignKey: "so_id", onDelete: "CASCADE" });
db.SalesOrderLine.belongsTo(db.SalesOrder, { foreignKey: "so_id", onDelete: "CASCADE" });
db.SalesOrderLine.belongsTo(db.Item, { foreignKey: "item_id", onDelete: "CASCADE" });
db.SalesOrderLine.belongsTo(db.GL_Account, { foreignKey: "revenue_account_id" });
db.SalesOrderLine.belongsTo(db.Tax, { foreignKey: "tax_id", onDelete: "SET NULL" });

// 🎯 **Customer Invoice Associations**
db.CustomerInvoice.belongsTo(db.Customer, { foreignKey: "customer_id" });
db.CustomerInvoice.belongsTo(db.Entity, { foreignKey: "entity_id" });
db.CustomerInvoice.belongsTo(db.SalesOrder, { foreignKey: "sales_order_id", onDelete: "SET NULL" });
db.CustomerInvoice.belongsTo(db.Currency, { foreignKey: "base_currency", targetKey: "currency_code" });
db.CustomerInvoice.hasMany(db.CustomerInvoiceLine, { foreignKey: "invoice_id", onDelete: "CASCADE" });
db.CustomerInvoiceLine.belongsTo(db.CustomerInvoice, { foreignKey: "invoice_id", onDelete: "CASCADE" });
db.CustomerInvoiceLine.belongsTo(db.Entity, { foreignKey: "entity_id" });
db.CustomerInvoiceLine.belongsTo(db.Item, { foreignKey: "item_id" });
db.CustomerInvoiceLine.belongsTo(db.GL_Account, { foreignKey: "revenue_account_id" });
db.CustomerInvoiceLine.belongsTo(db.Tax, { foreignKey: "tax_id", onDelete: "SET NULL" });

// ✅ Purchase Orders
db.PurchaseOrder.belongsTo(db.Vendor, { foreignKey: "vendor_id" });
db.PurchaseOrder.belongsTo(db.Entity, { foreignKey: "entity_id" });
db.PurchaseOrder.hasMany(db.PurchaseOrderLine, { foreignKey: "po_id", onDelete: "CASCADE" });
db.PurchaseOrderLine.belongsTo(db.PurchaseOrder, { foreignKey: "po_id", onDelete: "CASCADE" });
db.PurchaseOrder.belongsTo(db.SalesOrder, { foreignKey: "so_id", targetKey: "so_id" });
db.PurchaseOrderLine.belongsTo(db.Item, { foreignKey: "item_id", onDelete: "CASCADE" });
db.PurchaseOrderLine.belongsTo(db.GL_Account, { foreignKey: "expense_account_id" });

// 🎯 **Vendor Bill Associations**
db.VendorBill.belongsTo(db.Vendor, { foreignKey: "vendor_id" });
db.VendorBill.belongsTo(db.Entity, { foreignKey: "entity_id" });
db.VendorBill.belongsTo(db.PurchaseOrder, { foreignKey: "purchase_order_id", onDelete: "SET NULL" });
db.VendorBill.belongsTo(db.Currency, { foreignKey: "base_currency", targetKey: "currency_code" });
db.VendorBill.hasMany(db.VendorBillLine, { foreignKey: "bill_id", onDelete: "CASCADE" });
db.VendorBillLine.belongsTo(db.VendorBill, { foreignKey: "bill_id", onDelete: "CASCADE" });
db.VendorBillLine.belongsTo(db.Entity, { foreignKey: "entity_id" });
db.VendorBillLine.belongsTo(db.GL_Account, { foreignKey: "expense_account_id" });
db.VendorBillLine.belongsTo(db.Item, { foreignKey: "item_id" });
db.VendorBillLine.belongsTo(db.Tax, { foreignKey: "tax_id", onDelete: "SET NULL" });

// 🎯 **Journal Entry & Journal Entry Line Associations**
db.JournalEntry.belongsTo(db.Entity, { foreignKey: "entity_id" });
db.JournalEntry.belongsTo(db.Currency, { foreignKey: "base_currency", targetKey: "currency_code" });
db.JournalEntry.hasMany(db.JournalEntryLine, { foreignKey: "entry_id", onDelete: "CASCADE" });
db.JournalEntryLine.belongsTo(db.JournalEntry, { foreignKey: "entry_id", onDelete: "CASCADE" });
db.JournalEntryLine.belongsTo(db.GL_Account, { foreignKey: "account_id" });
db.JournalEntryLine.belongsTo(db.Entity, { foreignKey: "entity_id" });

// ✅ **Items Associations**
db.Item.belongsTo(db.Entity, { foreignKey: "entity_id" });
db.Item.hasMany(db.SalesOrderLine, { foreignKey: "item_id", onDelete: "SET NULL" });
db.Item.hasMany(db.PurchaseOrderLine, { foreignKey: "item_id", onDelete: "SET NULL" });
db.Item.hasMany(db.CustomerInvoiceLine, { foreignKey: "item_id", onDelete: "SET NULL" });
db.Item.hasMany(db.VendorBillLine, { foreignKey: "item_id", onDelete: "SET NULL" });

// ✅ **Tax Associations**
db.Tax.hasMany(db.Item, { foreignKey: "tax_id", onDelete: "SET NULL" });
db.Tax.hasMany(db.CustomerInvoiceLine, { foreignKey: "tax_id", onDelete: "SET NULL" });
db.Tax.hasMany(db.VendorBillLine, { foreignKey: "tax_id", onDelete: "SET NULL" });

// ✅ Entity Associations
db.Entity.hasMany(db.SalesOrder, { foreignKey: "entity_id" });

// Apply associations if they exist
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
