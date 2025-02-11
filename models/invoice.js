module.exports = (sequelize, DataTypes) => {
    const Invoice = sequelize.define("Invoice", {
      invoice_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Customer",
          key: "customer_id",
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
      invoice_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      due_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.DECIMAL(18, 6),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Draft", "Approved", "Paid", "Overdue"),
        defaultValue: "Draft",
      },
    });
  
    return Invoice;
  };
  