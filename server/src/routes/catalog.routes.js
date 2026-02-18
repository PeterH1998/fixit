const express = require("express");
const { listCatalog } = require("../controllers/catalog.controller");

const router = express.Router();

router.get("/catalog", listCatalog);

module.exports = router;
