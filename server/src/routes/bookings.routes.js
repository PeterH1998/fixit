const express = require("express");
const {
  listBookings,
  createBooking,
} = require("../controllers/bookings.controller");
const {
  createFixItBooking,
} = require("../controllers/fixitBookings.controller");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// curl -X POST http://localhost:5000/api/bookings -H "Content-Type: application/json" -d "{\"repairServiceId\":\"<uuid>\",\"startAt\":\"2026-02-20T10:00:00.000Z\"}"
// curl -X POST http://localhost:5000/api/bookings -H "Content-Type: application/json" -d "{\"repairServiceId\":\"<uuid>\",\"startAt\":\"2026-02-20T10:00:00.000Z\"}"
// curl "http://localhost:5000/api/bookings?repairServiceId=<uuid>&date=2026-02-20"
router.get("/bookings", listBookings);
router.post("/bookings", (req, res, next) => {
  const body = req.body || {};
  const isFixItPayload =
    body.brandId ||
    body.modelName ||
    body.repair ||
    body.name ||
    body.email ||
    body.date ||
    body.time;

  if (isFixItPayload) {
    return createFixItBooking(req, res, next);
  }

  return requireAuth(req, res, (err) => {
    if (err) return next(err);
    return createBooking(req, res, next);
  });
});

module.exports = router;
