const router = require("express").Router();
const { sequelize } = require("../models");

router.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ ok: true, db: "connected" });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

module.exports = router;
