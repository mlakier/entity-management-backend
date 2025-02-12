const express = require("express");
const { SalesOrder } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
    const orders = await SalesOrder.findAll();
    res.json(orders);
});

router.get("/:id", async (req, res) => {
    try {
        const customerInvoice = await CustomerInvoice.findByPk(req.params.id, {
            include: [
                { model: Customer, attributes: ["customer_name"] },
                { model: SalesOrder, attributes: ["so_number"] }, // ✅ Include SO number
            ],
        });

        if (!customerInvoice) {
            return res.status(404).json({ error: "Customer Invoice not found" });
        }

        res.json(customerInvoice);
    } catch (error) {
        console.error("🔥 Error fetching Customer Invoice:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/", async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const salesOrder = await SalesOrder.create(req.body, { transaction });
  
      // Fetch items from request
      const soItems = req.body.items;
  
      for (const item of soItems) {
        const itemData = await Item.findByPk(item.item_id);
        if (!itemData) throw new Error("Invalid item.");
  
        if (itemData.drop_ship || itemData.special_order) {
          const purchaseOrder = await PurchaseOrder.create(
            {
              vendor_id: itemData.vendor_id[0], // Selecting first vendor
              entity_id: req.body.entity_id,
              so_id: salesOrder.so_id,
              po_date: new Date(),
              total_amount: item.quantity * item.unit_price,
              status: "Draft",
              auto_created: true,
              created_by: req.body.created_by,
              updated_by: req.body.updated_by,
            },
            { transaction }
          );
  
          await PurchaseOrderLine.create(
            {
              po_id: purchaseOrder.po_id,
              item_id: item.item_id,
              quantity: item.quantity,
              unit_price: item.unit_price,
            },
            { transaction }
          );
        }
      }
  
      await transaction.commit();
      res.status(201).json(salesOrder);
    } catch (error) {
      await transaction.rollback();
      console.error("🔥 Error creating Sales Order:", error);
      res.status(500).json({ error: "Failed to create Sales Order." });
    }
  });

router.put("/:id", async (req, res) => {
    try {
        const [updated] = await SalesOrder.update(req.body, { where: { po_id: req.params.id } });
        if (!updated) return res.status(404).json({ error: "Purchase Order not found" });
        res.json({ message: "Purchase Order updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating Purchase Order" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await SalesOrder.destroy({ where: { po_id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: "Purchase Order not found" });
        res.json({ message: "Purchase Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting Purchase Order" });
    }
});

module.exports = router;
