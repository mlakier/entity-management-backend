module.exports = (sequelize, DataTypes) => {
    const PurchaseOrder = sequelize.define("PurchaseOrder", {
        po_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        vendor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "Vendors", key: "vendor_id" }
        },
        entity_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "Entities", key: "entity_id" }
        },
        so_id: {
            type: DataTypes.INTEGER,
            references: { model: "Sales_Order", key: "so_id" },
            comment: "Linked to Sales Order for drop ship or special orders",
          },
        po_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        expected_delivery: {
            type: DataTypes.DATEONLY
        },
        total_amount: {
            type: DataTypes.DECIMAL(18,2),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("Draft", "Approved", "Received", "Closed"),
            defaultValue: "Draft"
        },
        auto_created: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            comment: "True if created automatically for drop ship or special order items",
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
        tableName: "Purchase_Order",
        timestamps: true
    });

  // ✅ Define Associations
  PurchaseOrder.associate = (models) => {
    PurchaseOrder.belongsTo(models.Vendor, { foreignKey: "vendor_id" });
    PurchaseOrder.belongsTo(models.Entity, { foreignKey: "entity_id" });
    PurchaseOrder.belongsTo(models.SalesOrder, { foreignKey: "so_id" });
    PurchaseOrder.hasMany(models.PurchaseOrderLine, { foreignKey: "po_id", onDelete: "CASCADE" });
  };

    return PurchaseOrder;
};
