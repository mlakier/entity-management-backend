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
      customer_type: {
        type: DataTypes.ENUM("Company","Individual"),
        allowNull: true,
      },
      industry: {
        type: DataTypes.STRING,
        allowNull: true,
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
      sales_rep:{
        type:DataTypes.STRING,
        allowNull:true,
      },
      lead_source:{
        type:DataTypes.STRING,
        allowNull:true,
      },
      default_currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      terms: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      credit_limit: {
        type: DataTypes.DECIMAL(18, 6),
        allowNull: false,
      },
      bank_details: {
        type: DataTypes.JSONB, // Stores bank account details
        allowNull: true,
      },
      email_format: {
        type: DataTypes.ENUM("HTML","PDF"),
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
        tableName: "Customers",
        timestamps: true,
    });
  
    return Customer;
  };
  