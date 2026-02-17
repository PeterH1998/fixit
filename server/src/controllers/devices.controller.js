const initModels = require("../db/models");
const { sequelize } = require("../config/db");

const { Device } = initModels(sequelize);

const listDevices = async (req, res, next) => {
  try {
    const items = await Device.findAll({ order: [["id", "ASC"]] });
    return res.json({ items });
  } catch (err) {
    return next(err);
  }
};

module.exports = { listDevices };
