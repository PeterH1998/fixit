const express = require("express");
const { listDevices } = require("../controllers/devices.controller");

const router = express.Router();

router.get("/devices", listDevices);

module.exports = router;
