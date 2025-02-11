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
            references: { model: "Vendor", key: "vendor_id" }
        },
        entity_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "Entity", key: "entity_id" }
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

    PurchaseOrder.associate = (models) => {
        PurchaseOrder.belongsTo(models.Vendor, { foreignKey: "vendor_id" });
        PurchaseOrder.belongsTo(models.Entity, { foreignKey: "entity_id" });
        PurchaseOrder.hasMany(models.PurchaseOrderLine, { foreignKey: "po_id" });
    };

    return PurchaseOrder;
};
