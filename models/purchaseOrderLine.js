module.exports = (sequelize, DataTypes) => {
    const PurchaseOrderLine = sequelize.define("PurchaseOrderLine", {
        line_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        po_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "PurchaseOrder", key: "po_id" }
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unit_price: {
            type: DataTypes.DECIMAL(18,2),
            allowNull: false
        },
        total_price: {
            type: DataTypes.DECIMAL(18,2),
            allowNull: false
        }
    }, {
        tableName: "Purchase_Order_Line",
        timestamps: true
    });

    PurchaseOrderLine.associate = (models) => {
        PurchaseOrderLine.belongsTo(models.PurchaseOrder, { foreignKey: "po_id" });
    };

    return PurchaseOrderLine;
};
