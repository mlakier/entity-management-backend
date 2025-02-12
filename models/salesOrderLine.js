module.exports = (sequelize, DataTypes) => {
    const SalesOrderLine = sequelize.define("SalesOrderLine", {
        line_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        so_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "Sales_Order", key: "so_id" }
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
        tableName: "Sales_Order_Line",
        timestamps: true
    });

    SalesOrderLine.associate = (models) => {
        SalesOrderLine.belongsTo(models.SalesOrder, { foreignKey: "so_id" });
    };

    return SalesOrderLine;
};
