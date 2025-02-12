module.exports = (sequelize, DataTypes) => {
    const Vendor = sequelize.define("Vendor", {
      vendor_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      vendor_name: {
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
        type: DataTypes.JSONB, // Stores email, phone, and address as a JSON object
        allowNull: true,
      },
      payment_terms: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Net 30", // Default payment terms
      },
      default_currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        references: {
          model: "Currency",
          key: "currency_code",
        },
      },
      compliance_certificates: {
        type: DataTypes.JSONB, // Stores compliance-related files
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER, // Rating out of 5
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
        tableName: "Vendors",
        timestamps: true,
    });
  
    return Vendor;
  };
  