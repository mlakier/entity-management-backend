module.exports = (sequelize, DataTypes) => {
    const JournalEntryLine = sequelize.define("JournalEntryLine", {
      line_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      entry_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "JournalEntry",
          key: "entry_id",
        },
      },
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "GL_Account",
          key: "account_id",
        },
      },
      entity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Entities",
          key: "entity_id",
        },
      },
      base_currency_amount: {
        type: DataTypes.DECIMAL(18, 6),
        allowNull: false,
      },
      transaction_currency_amount: {
        type: DataTypes.DECIMAL(18, 6),
        allowNull: false,
      },
      exchange_rate: {
        type: DataTypes.DECIMAL(18, 6),
        allowNull: false,
      },
      debit: {
        type: DataTypes.DECIMAL(18, 6),
        allowNull: true,
      },
      credit: {
        type: DataTypes.DECIMAL(18, 6),
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
    });
  
    return JournalEntryLine;
  };

  