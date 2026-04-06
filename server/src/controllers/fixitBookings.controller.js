const initModels = require("../db/models");
const { sequelize } = require("../config/db");

const { Brand, PhoneModel, RepairOption, FixItBooking } = initModels(sequelize);

const isMissing = (value) => value === undefined || value === null || value === "";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^(0?[1-9]|1[0-2]):[0-5]\d\s?(AM|PM)$/i;
const normalizeTime = (value) => String(value).trim().toUpperCase();

const listFixItAvailability = async (req, res, next) => {
  try {
    const { date } = req.query || {};

    if (!ISO_DATE_REGEX.test(String(date)) || Number.isNaN(new Date(date).getTime())) {
      return res
        .status(400)
        .json({ ok: false, error: { message: "invalid date" } });
    }

    const bookings = await FixItBooking.findAll({
      where: { date },
      attributes: ["time"],
      order: [["time", "ASC"]],
    });

    const bookedTimes = [...new Set(bookings.map((booking) => booking.time))];
    return res.json({ ok: true, date, bookedTimes });
  } catch (err) {
    return next(err);
  }
};

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

    const normalizedName = typeof name === "string" ? name.trim() : "";
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const normalizedNotes = typeof notes === "string" ? notes.trim() : "";
    const normalizedModelName =
      typeof modelName === "string" ? modelName.trim() : "";

    if (
      isMissing(brandId) ||
      isMissing(normalizedModelName) ||
      !repair ||
      isMissing(repair.type) ||
      isMissing(repair.name) ||
      isMissing(normalizedName) ||
      isMissing(normalizedEmail) ||
      isMissing(date) ||
      isMissing(time)
    ) {
      return res
        .status(400)
        .json({ ok: false, error: { message: "missing required fields" } });
    }

    if (
      String(brandId).length > 50 ||
      normalizedModelName.length > 255 ||
      normalizedName.length > 255 ||
      normalizedEmail.length > 255 ||
      normalizedNotes.length > 2000
    ) {
      return res
        .status(400)
        .json({ ok: false, error: { message: "invalid field length" } });
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return res
        .status(400)
        .json({ ok: false, error: { message: "invalid email" } });
    }

    if (!ISO_DATE_REGEX.test(String(date)) || Number.isNaN(new Date(date).getTime())) {
      return res
        .status(400)
        .json({ ok: false, error: { message: "invalid date" } });
    }

    if (!TIME_REGEX.test(String(time))) {
      return res
        .status(400)
        .json({ ok: false, error: { message: "invalid time" } });
    }

    const normalizedTime = normalizeTime(time);

    const brand = await Brand.findByPk(String(brandId));
    if (!brand) {
      return res
        .status(400)
        .json({ ok: false, error: { message: "invalid brand" } });
    }

    const model = await PhoneModel.findOne({
      where: {
        brandId: brand.id,
        name: normalizedModelName,
      },
    });

    if (!model) {
      return res
        .status(400)
        .json({ ok: false, error: { message: "invalid model" } });
    }

    const repairOption = await RepairOption.findOne({
      where: {
        modelId: model.id,
        type: String(repair.type),
        name: String(repair.name),
      },
    });

    if (!repairOption) {
      return res
        .status(400)
        .json({ ok: false, error: { message: "invalid repair option" } });
    }

    const booking = await sequelize.transaction(async (transaction) => {
      const slotKey = `${date}|${normalizedTime}`;
      await sequelize.query("SELECT pg_advisory_xact_lock(hashtext(:slotKey))", {
        replacements: { slotKey },
        transaction,
      });

      const existingBooking = await FixItBooking.findOne({
        where: {
          date,
          time: normalizedTime,
        },
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (existingBooking) {
        const conflictError = new Error("That appointment slot is already booked.");
        conflictError.status = 409;
        throw conflictError;
      }

      return FixItBooking.create(
        {
          brandId: brand.id,
          modelName: model.name,
          repairType: repairOption.type,
          repairName: repairOption.name,
          price: repairOption.price,
          duration: repairOption.time,
          customerName: normalizedName,
          customerEmail: normalizedEmail,
          notes: normalizedNotes || null,
          date,
          time: normalizedTime,
        },
        { transaction }
      );
    });

    return res.status(201).json({ ok: true, bookingId: booking.id });
  } catch (err) {
    return next(err);
  }
};

module.exports = { createFixItBooking, listFixItAvailability };
