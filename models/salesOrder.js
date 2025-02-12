module.exports = (sequelize, DataTypes) => {
    const SalesOrder = sequelize.define("SalesOrder", {
        so_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "Customers",  // ✅ Ensure this matches the correct table name
              key: "customer_id",
            },
            onDelete: "NO ACTION",
            onUpdate: "CASCADE",
          },
          entity_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "Entities",  // ✅ Ensure this matches the correct table name
              key: "entity_id",
            },
            onDelete: "NO ACTION",
            onUpdate: "CASCADE",
          },
        so_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        expected_shipment: {
            type: DataTypes.DATEONLY
        },
        total_amount: {
            type: DataTypes.DECIMAL(18,2),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("Draft", "Confirmed", "Shipped", "Closed"),
            defaultValue: "Draft"
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "Sales_Order",
        timestamps: true
    });

    SalesOrder.associate = (models) => {
        SalesOrder.belongsTo(models.Customer, { foreignKey: "customer_id" });
        SalesOrder.belongsTo(models.Entity, { foreignKey: "entity_id" });
        SalesOrder.hasMany(models.SalesOrderLine, { foreignKey: "so_id" });
    };

    return SalesOrder;
};
