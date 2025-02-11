'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';
const config = require("../config/config.json")[env];

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

const db = {};

// ✅ Explicitly Import Models
db.Currency = require("./currency")(sequelize, DataTypes);
db.ExchangeRate = require("./exchangeRate")(sequelize, DataTypes);
db.GL_Account = require("./glAccount")(sequelize, DataTypes);
db.Entity = require("./entity")(sequelize, DataTypes);

// ✅ Define Associations (Foreign Keys)

// 📌 Currency & Exchange Rates
db.Currency.hasMany(db.ExchangeRate, { foreignKey: "base_currency", as: "BaseCurrencyRates" });
db.Currency.hasMany(db.ExchangeRate, { foreignKey: "target_currency", as: "TargetCurrencyRates" });
db.ExchangeRate.belongsTo(db.Currency, { foreignKey: "base_currency", as: "BaseCurrency" });
db.ExchangeRate.belongsTo(db.Currency, { foreignKey: "target_currency", as: "TargetCurrency" });

// 📌 General Ledger (GL) Accounts
db.GL_Account.belongsTo(db.Currency, { foreignKey: "currency", targetKey: "currency_code", as: "CurrencyDetails" });
db.GL_Account.belongsTo(db.Entity, { foreignKey: "entity_id", targetKey: "entity_id", as: "EntityDetails" });

// ✅ Assign Sequelize & Export DB
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
