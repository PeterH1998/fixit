const { Op } = require("sequelize");
const initModels = require("../db/models");
const { sequelize } = require("../config/db");

const { RepairService, Booking } = initModels(sequelize);

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isValidUuid = (value) => UUID_REGEX.test(String(value));

const parseIsoDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const listBookings = async (req, res, next) => {
  try {
    const { repairServiceId, date } = req.query;
    const where = {};

    if (repairServiceId) {
      if (!isValidUuid(repairServiceId)) {
        return res
          .status(400)
          .json({ ok: false, error: { message: "invalid repairServiceId" } });
      }
      where.repairServiceId = repairServiceId;
    }

    if (date) {
      const start = new Date(`${date}T00:00:00.000Z`);
      if (Number.isNaN(start.getTime())) {
        return res
          .status(400)
          .json({ ok: false, error: { message: "invalid date" } });
      }
      const end = new Date(start);
      end.setUTCDate(end.getUTCDate() + 1);
      where.startAt = { [Op.gte]: start, [Op.lt]: end };
    }

    const data = await Booking.findAll({
      where,
      order: [["startAt", "ASC"]],
    });

    return res.json({ ok: true, data });
  } catch (err) {
    return next(err);
  }
};

const createBooking = async (req, res, next) => {
  try {
    const { repairServiceId, startAt } = req.body || {};

    if (!isValidUuid(repairServiceId)) {
      return res
        .status(400)
        .json({ ok: false, error: { message: "invalid repairServiceId" } });
    }

    const startDate = parseIsoDate(startAt);
    if (!startDate) {
      return res
        .status(400)
        .json({ ok: false, error: { message: "invalid startAt" } });
    }

    const repairService = await RepairService.findByPk(repairServiceId);
    if (!repairService) {
      return res
        .status(404)
        .json({ ok: false, error: { message: "repair service not found" } });
    }

    const endDate = new Date(
      startDate.getTime() + repairService.durationMinutes * 60 * 1000
    );

    const conflict = await Booking.findOne({
      where: {
        repairServiceId,
        startAt: { [Op.lt]: endDate },
        endAt: { [Op.gt]: startDate },
      },
    });

    if (conflict) {
      return res
        .status(409)
        .json({ ok: false, error: { message: "slot unavailable" } });
    }

    const data = await Booking.create({
      repairServiceId,
      deviceId: repairService.deviceId,
      startAt: startDate,
      endAt: endDate,
      status: "confirmed",
      userId: req.user.id,
    });

    return res.status(201).json({ ok: true, data });
  } catch (err) {
    return next(err);
  }
};

module.exports = { listBookings, createBooking };
