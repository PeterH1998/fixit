const initModels = require("../db/models");
const { sequelize } = require("../config/db");

const { FixItBooking } = initModels(sequelize);

const isMissing = (value) => value === undefined || value === null || value === "";

const createFixItBooking = async (req, res, next) => {
  try {
    const {
      brandId,
      modelName,
      repair,
      name,
      email,
      notes,
      date,
      time,
    } = req.body || {};

    if (
      isMissing(brandId) ||
      isMissing(modelName) ||
      !repair ||
      isMissing(repair.type) ||
      isMissing(repair.name) ||
      isMissing(repair.price) ||
      isMissing(repair.time) ||
      isMissing(name) ||
      isMissing(email) ||
      isMissing(date) ||
      isMissing(time)
    ) {
      return res
        .status(400)
        .json({ ok: false, error: { message: "missing required fields" } });
    }

    const booking = await FixItBooking.create({
      brandId,
      modelName,
      repairType: repair.type,
      repairName: repair.name,
      price: repair.price,
      duration: repair.time,
      customerName: name,
      customerEmail: email,
      notes: notes || null,
      date,
      time,
    });

    return res.status(201).json({ ok: true, bookingId: booking.id });
  } catch (err) {
    return next(err);
  }
};

module.exports = { createFixItBooking };
