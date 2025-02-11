module.exports = (sequelize, DataTypes) => {
    const VendorBill = sequelize.define("VendorBill", {
        bill_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        vendor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Vendors", // 🔗 Foreign key to Vendors
                key: "vendor_id",
            },
        },
        entity_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Entities", // 🔗 Foreign key to Entities
                key: "entity_id",
            },
        },
        bill_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        due_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        base_currency: {
            type: DataTypes.STRING(3),
            allowNull: false,
            references: {
                model: "Currency", // 🔗 Foreign key to Currency
                key: "currency_code",
            },
        },
        transaction_currency: {
            type: DataTypes.STRING(3),
            allowNull: false,
        },
        exchange_rate: {
            type: DataTypes.DECIMAL(18,6),
            allowNull: false,
        },
        total_amount: {
            type: DataTypes.DECIMAL(18,2),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("Draft", "Pending Approval", "Approved", "Paid"),
            defaultValue: "Draft",
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
        tableName: "Vendor_Bills",
        timestamps: true,
    });

    return VendorBill;
};
