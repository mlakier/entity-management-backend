module.exports = (sequelize, DataTypes) => {
  const ExchangeRate = sequelize.define(
    "ExchangeRate",
    {
      rate_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      base_currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        references: {
          model: "Currency",
          key: "currency_code",
        },
      },
      target_currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        references: {
          model: "Currency",
          key: "currency_code",
        },
      },
      exchange_rate: {
        type: DataTypes.DECIMAL(18, 6),
        allowNull: false,
      },
      rate_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_DATE"),
      },
      source: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "manual", // Can be 'manual' or an API source name
      },
    },
    {
      tableName: "Exchange_Rate",
      timestamps: false, // Disable automatic timestamp fields
    }
  );

  // ✅ Define Associations
  ExchangeRate.associate = (models) => {
    ExchangeRate.belongsTo(models.Currency, {
      foreignKey: "base_currency",
      as: "BaseCurrency",
    });
    ExchangeRate.belongsTo(models.Currency, {
      foreignKey: "target_currency",
      as: "TargetCurrency",
    });
  };

  return ExchangeRate;
};
