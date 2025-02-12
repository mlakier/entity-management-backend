const express = require("express");
const { VendorBill } = require("../models");

const router = express.Router();

// 📌 Get All Vendor Bills
router.get("/", async (req, res) => {
    try {
        const bills = await VendorBill.findAll();
        res.json(bills);
    } catch (error) {
        res.status(500).json({ error: "Error fetching vendor bills" });
    }
});

// 📌 Get Vendor Bill by ID
router.get("/:id", async (req, res) => {
    try {
        const vendorBill = await VendorBill.findByPk(req.params.id, {
            include: [
                { model: Vendor, attributes: ["vendor_name"] },
                { model: PurchaseOrder, attributes: ["po_number"] }, // ✅ Include PO number
            ],
        });

        if (!vendorBill) {
            return res.status(404).json({ error: "Vendor Bill not found" });
        }

        res.json(vendorBill);
    } catch (error) {
        console.error("🔥 Error fetching Vendor Bill:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/", async (req, res) => {
    try {
      const vendorBill = await VendorBill.create(req.body);
  
      for (const line of req.body.lines) {
        const item = await Item.findByPk(line.item_id);
        if (!item) throw new Error("Invalid item.");
  
        let expenseAccount = item.expense_gl;
        if (item.deferred_cost_gl && item.item_type === "Inventory") {
          expenseAccount = item.deferred_cost_gl;
        }
  
        await VendorBillLine.create({
          bill_id: vendorBill.bill_id,
          item_id: line.item_id,
          quantity: line.quantity,
          unit_price: line.unit_price,
          expense_account_id: expenseAccount,
        });
      }
  
      res.status(201).json(vendorBill);
    } catch (error) {
      console.error("🔥 Error creating Vendor Bill:", error);
      res.status(500).json({ error: "Failed to create Vendor Bill." });
    }
  });

// 📌 Update Vendor Bill
router.put("/:id", async (req, res) => {
    try {
        const [updated] = await VendorBill.update(req.body, { where: { bill_id: req.params.id } });
        if (!updated) return res.status(404).json({ error: "Vendor bill not found" });
        res.json({ message: "Vendor bill updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating vendor bill" });
    }
});

// 📌 Delete Vendor Bill
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await VendorBill.destroy({ where: { bill_id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: "Vendor bill not found" });
        res.json({ message: "Vendor bill deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting vendor bill" });
    }
});

module.exports = router;
