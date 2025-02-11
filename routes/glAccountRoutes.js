const express = require("express");
const { GL_Account } = require("../models");

const router = express.Router();

// ✅ Create a new GL Account
router.post("/", async (req, res) => {
    try {
        const newAccount = await GL_Account.create(req.body);
        res.status(201).json(newAccount);
    } catch (error) {
        console.error("🔥 Error creating GL Account:", error);
        res.status(400).json({ error: error.message });
    }
});

// ✅ Get all GL Accounts
router.get("/", async (req, res) => {
    try {
      const glAccounts = await GL_Account.findAll();
      res.status(200).json(glAccounts);
    } catch (error) {
      console.error("🔥 Error fetching GL Accounts:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// ✅ Get a specific GL Account by ID
router.get("/:id", async (req, res) => {
    try {
        const account = await GL_Account.findByPk(req.params.id);
        if (!account) {
            return res.status(404).json({ error: "GL Account not found" });
        }
        res.status(200).json(account);
    } catch (error) {
        console.error("🔥 Error fetching GL Account:", error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Update a GL Account
router.put("/:id", async (req, res) => {
    try {
        const [updated] = await GL_Account.update(req.body, {
            where: { account_id: req.params.id },
        });

        if (!updated) {
            return res.status(404).json({ error: "GL Account not found" });
        }

        const updatedAccount = await GL_Account.findByPk(req.params.id);
        res.status(200).json(updatedAccount);
    } catch (error) {
        console.error("🔥 Error updating GL Account:", error);
        res.status(400).json({ error: error.message });
    }
});

// ✅ Delete a GL Account
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await GL_Account.destroy({
            where: { account_id: req.params.id },
        });

        if (!deleted) {
            return res.status(404).json({ error: "GL Account not found" });
        }

        res.status(200).json({ message: "GL Account deleted successfully" });
    } catch (error) {
        console.error("🔥 Error deleting GL Account:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    console.log("📢 GET /api/gl-accounts endpoint was called!");
    try {
      const glAccounts = await GL_Account.findAll();
      res.status(200).json(glAccounts);
    } catch (error) {
      console.error("🔥 Error fetching GL Accounts:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
module.exports = router;
