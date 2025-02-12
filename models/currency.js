module.exports = (sequelize, DataTypes) => {
    const Currency = sequelize.define("Currency", {
      currency_code: {
        type: DataTypes.STRING(3),
        primaryKey: true,
        allowNull: false,
      },
      currency_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      exchange_rate: {
        type: DataTypes.DECIMAL(18,6),
        allowNull: false,
        defaultValue: 1.000000,
      },
      last_updated: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    }, 
    {
      tableName: "Currency",
      timestamps: false,
    });
  
    return Currency;
  };
  