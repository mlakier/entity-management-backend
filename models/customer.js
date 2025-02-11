module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("Customer", {
      customer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Entities",
          key: "entity_id",
        },
      },
      contact_info: {
        type: DataTypes.JSONB, // Stores email, phone, address
        allowNull: true,
      },
      default_currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      credit_limit: {
        type: DataTypes.DECIMAL(18, 6),
        allowNull: false,
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
  
    return Customer;
  };
  