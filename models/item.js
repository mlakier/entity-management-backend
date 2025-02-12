module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define(
      "Item",
      {
        item_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        entity_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "Entities", key: "entity_id" },
        },
        include_children: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          comment: "If true, item applies to child entities.",
        },
        item_type: {
          type: DataTypes.ENUM("Inventory", "Non-Inventory", "Service", "Expense"),
          allowNull: false,
        },
        sales_description: {
          type: DataTypes.TEXT,
        },
        purchase_description: {
          type: DataTypes.TEXT,
        },
        tax_code: {
          type: DataTypes.INTEGER,
          references: { model: "Tax", key: "tax_id" },
        },
        vendor_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "Vendors",
            key: "vendor_id",
          },
          onDelete: "SET NULL",
        },
        vendor_price: {
          type: DataTypes.JSONB, // Stores prices per vendor { "vendor_id": price }
        },
        // 🔹 ASC 606 GL Accounts
        contract_liability_gl: {
          type: DataTypes.INTEGER,
          references: { model: "GL_Account", key: "account_id" },
          comment: "Deferred revenue account",
        },
        contract_asset_gl: {
          type: DataTypes.INTEGER,
          references: { model: "GL_Account", key: "account_id" },
          comment: "Recognized but unbilled revenue",
        },
        deferred_cost_gl: {
          type: DataTypes.INTEGER,
          references: { model: "GL_Account", key: "account_id" },
          comment: "Deferred cost account for unrecognized expenses",
        },
        revenue_gl: {
          type: DataTypes.INTEGER,
          references: { model: "GL_Account", key: "account_id" },
        },
        inventory_gl: {
          type: DataTypes.INTEGER,
          references: { model: "GL_Account", key: "account_id" },
        },
        cogs_gl: {
          type: DataTypes.INTEGER,
          references: { model: "GL_Account", key: "account_id" },
        },
        // 🔹 Fulfillment & PO Automation
        drop_ship: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          comment: "If true, auto-creates PO upon SO confirmation.",
        },
        special_order: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          comment: "If true, auto-creates PO for special orders.",
        },
        can_be_fulfilled: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          comment: "If true, requires fulfillment before invoicing.",
        },
        // 🔹 Inventory Management
        stock_on_hand: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        reorder_point: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          comment: "Triggers PO creation when stock falls below this level.",
        },
        lead_time_days: {
          type: DataTypes.INTEGER,
          defaultValue: 7,
          comment: "Number of days required to receive stock.",
        },
        created_by: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        updated_by: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: "Items",
        timestamps: true,
      }
    );
  
 // ✅ Define Associations
 Item.associate = (models) => {
  Item.belongsTo(models.Entity, { foreignKey: "entity_id" });
  Item.belongsTo(models.Tax, { foreignKey: "tax_id", onDelete: "SET NULL" });
  Item.belongsTo(models.Vendor, { foreignKey: "vendor_id" });
  Item.belongsTo(models.GL_Account, { foreignKey: "revenue_account_id", as: "RevenueAccount" });
  Item.belongsTo(models.GL_Account, { foreignKey: "deferred_revenue_account_id", as: "DeferredRevenueAccount" });
  Item.belongsTo(models.GL_Account, { foreignKey: "expense_account_id", as: "ExpenseAccount" });
  Item.belongsTo(models.GL_Account, { foreignKey: "deferred_cost_account_id", as: "DeferredCostAccount" });

  // ✅ Relationships with Orders
  Item.hasMany(models.PurchaseOrderLine, { foreignKey: "item_id", onDelete: "SET NULL" });
  Item.hasMany(models.SalesOrderLine, { foreignKey: "item_id", onDelete: "SET NULL" });
};

return Item;
};