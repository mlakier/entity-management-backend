'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sales_Order', { // ✅ Explicit table name
      so_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Customers",  // ✅ Ensure this matches the correct table name
          key: "customer_id",
        },
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
      },
      entity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Entities",  // ✅ Ensure this matches the correct table name
          key: "entity_id",
        },
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
      },
    so_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    expected_shipment: {
        type: Sequelize.DATEONLY
    },
    total_amount: {
        type: Sequelize.DECIMAL(18,2),
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM("Draft", "Confirmed", "Shipped", "Closed"),
        defaultValue: "Draft"
    },
    created_by: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sales_Order');
  }
};
