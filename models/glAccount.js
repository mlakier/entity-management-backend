module.exports = (sequelize, DataTypes) => {
    const GL_Account = sequelize.define("GL_Account", {
      account_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      account_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      account_type: {
        type: DataTypes.ENUM("Asset", "Liability", "Equity", "Revenue", "Expense"),
        allowNull: false,
      },
      account_category: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(3), // 💰 Multi-currency support
        allowNull: false,
        references: {
          model: "Currency",
          key: "currency_code",
        },
      },
      entity_id: {
        type: DataTypes.INTEGER, // 🏢 Multi-entity support
        allowNull: false,
        references: {
          model: "Entities",
          key: "entity_id",
        },
      },
      parent_account_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "GL_Account",
          key: "account_id",
        },
      },
      is_tax_related: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      regulatory_mapping: {
        type: DataTypes.JSONB, // 🏛 Align accounts with GAAP, IFRS, etc.
        allowNull: true,
      },
      metadata: {
        type: DataTypes.JSONB, // 🛠 Custom fields
        allowNull: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: "GL_Account",
      timestamps: true, // ⏳ Track created_at and updated_at
    });
  
    return GL_Account;
  };
  