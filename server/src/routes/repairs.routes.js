const express = require("express");
const { listRepairs } = require("../controllers/repairs.controller");

const router = express.Router();

router.get("/repairs", listRepairs);

module.exports = router;
