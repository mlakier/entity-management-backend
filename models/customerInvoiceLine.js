module.exports = (sequelize, DataTypes) => {
    const CustomerInvoiceLine = sequelize.define("CustomerInvoiceLine", {
        line_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        invoice_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Customer_Invoices", // 🔗 Foreign key to Customer Invoice
                key: "invoice_id",
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
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unit_price: {
            type: DataTypes.DECIMAL(18,2),
            allowNull: false,
        },
        base_currency_amount: {
            type: DataTypes.DECIMAL(18,2),
            allowNull: false,
        },
        transaction_currency_amount: {
            type: DataTypes.DECIMAL(18,2),
            allowNull: false,
        },
        revenue_account_id: {
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
        tableName: "Customer_Invoice_Lines",
        timestamps: true,
    });

    return CustomerInvoiceLine;
};
