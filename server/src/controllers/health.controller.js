const { sequelize } = require("../models");

const getHealth = async (req, res, next) => {
  try {
    await sequelize.authenticate();
    return res.json({ ok: true, db: "connected" });
  } catch (err) {
    err.status = 500;
    return next(err);
  }
};

module.exports = { getHealth };
