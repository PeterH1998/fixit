const { sequelize } = require("../db");
const initModels = require("../db/models");

const { RepairService, Device } = initModels(sequelize);

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const listRepairs = async (req, res) => {
  try {
    const { deviceId } = req.query;

    const where = {};
    if (deviceId) {
      if (!UUID_RE.test(deviceId)) {
        return res.status(400).json({
          ok: false,
          error: { message: `deviceId must be a valid UUID (got: ${deviceId})` }
        });
      }
      where.deviceId = deviceId;
    }

    const repairs = await RepairService.findAll({
      where,
      include: [{ model: Device }],
      order: [["name", "ASC"]],
    });

    return res.json({ ok: true, data: repairs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: { message: err.message }
    });
  }
};

module.exports = { listRepairs };
