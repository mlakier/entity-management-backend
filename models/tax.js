module.exports = (sequelize, DataTypes) => {
    const Tax = sequelize.define(
      "Tax",
      {
        tax_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        tax_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        tax_rate: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: false,
        },
        tax_code: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: "Tax",
        timestamps: true,
      }
    );
  
    // ✅ Associations
    Tax.associate = (models) => {
      Tax.hasMany(models.Item, { foreignKey: "tax_id", onDelete: "SET NULL" });
      Tax.hasMany(models.CustomerInvoiceLine, { foreignKey: "tax_id", onDelete: "SET NULL" });
      Tax.hasMany(models.VendorBillLine, { foreignKey: "tax_id", onDelete: "SET NULL" });
    };
  
    return Tax;
  };
  