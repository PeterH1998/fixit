const express = require("express");
const { listCatalog } = require("../controllers/catalog.controller");
const { createRateLimit } = require("../middleware/rateLimit");

const router = express.Router();
const publicCatalogLimiter = createRateLimit({
  windowMs: 5 * 60 * 1000,
  maxRequests: 120,
});

router.get("/catalog", publicCatalogLimiter, listCatalog);

module.exports = router;
