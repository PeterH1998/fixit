const express = require("express");
const {
  listBookings,
  createBooking,
} = require("../controllers/bookings.controller");

const router = express.Router();

// curl -X POST http://localhost:5000/api/bookings -H "Content-Type: application/json" -d "{\"repairServiceId\":\"<uuid>\",\"startAt\":\"2026-02-20T10:00:00.000Z\"}"
// curl -X POST http://localhost:5000/api/bookings -H "Content-Type: application/json" -d "{\"repairServiceId\":\"<uuid>\",\"startAt\":\"2026-02-20T10:00:00.000Z\"}"
// curl "http://localhost:5000/api/bookings?repairServiceId=<uuid>&date=2026-02-20"
router.get("/bookings", listBookings);
router.post("/bookings", createBooking);

module.exports = router;
