module.exports = (sequelize, DataTypes) => {
    const JournalEntry = sequelize.define("JournalEntry", {
      entry_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      entry_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Entities", // ✅ Make sure the entity table name is correct
          key: "entity_id",
        },
      },
      base_currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        references: {
          model: "Currency",
          key: "currency_code",
        },
      },
      transaction_currency: {
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
      reference_type: {
        type: DataTypes.STRING,
        allowNull: true, // E.g., 'VendorBill', 'Invoice'
      },
      reference_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      approval_status: {
        type: DataTypes.ENUM("Draft", "Pending Approval", "Approved"),
        defaultValue: "Draft",
      },
      posted_status: {
        type: DataTypes.ENUM("Posted", "Unposted"),
        defaultValue: "Unposted",
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
        tableName: "Journal_Entry",
        timestamps: true,
    });
  
    return JournalEntry;
  };
  