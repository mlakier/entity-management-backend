module.exports = (sequelize, DataTypes) => {
    const VendorBillLine = sequelize.define("VendorBillLine", {
        line_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        bill_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Vendor_Bills", // 🔗 Foreign key to Vendor Bill
                key: "bill_id",
            },
            onDelete: "CASCADE",
        },
        entity_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Entities", // 🔗 Foreign key to Entities
                key: "entity_id",
            },
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: true, // Optional: Can be used if linking to inventory items
        },
        base_currency_amount: {
            type: DataTypes.DECIMAL(18,2),
            allowNull: false,
        },
        transaction_currency_amount: {
            type: DataTypes.DECIMAL(18,2),
            allowNull: false,
        },
        expense_account_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "GL_Account", // 🔗 Foreign key to GL Account
                key: "account_id",
            },
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
        tableName: "Vendor_Bill_Lines",
        timestamps: true,
    });

    return VendorBillLine;
};
