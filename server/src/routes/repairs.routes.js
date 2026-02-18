const express = require("express");
const { listRepairs, getRepairById } = require("../controllers/repairs.controller");

const router = express.Router();

router.get("/repairs", listRepairs);
router.get("/repairs/:id", getRepairById);

module.exports = router;
