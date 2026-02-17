const express = require("express");
const { register, login, me } = require("../controllers/auth.controller");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"email\":\"user@example.com\",\"password\":\"password123\",\"name\":\"Fix It\"}"
// curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"user@example.com\",\"password\":\"password123\"}"
// curl http://localhost:5000/api/me -H "Authorization: Bearer <token>"
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/me", requireAuth, me);

module.exports = router;
