const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const initModels = require("../db/models");
const { sequelize } = require("../config/db");

const { User } = initModels(sequelize);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body || {};

    if (!email || !EMAIL_REGEX.test(String(email))) {
      return res
        .status(400)
        .json({ ok: false, error: { message: "invalid email" } });
    }

    if (!password || String(password).length < 8) {
      return res
        .status(400)
        .json({ ok: false, error: { message: "password too short" } });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res
        .status(409)
        .json({ ok: false, error: { message: "email already registered" } });
    }

    const passwordHash = await bcrypt.hash(String(password), 10);
    const user = await User.create({
      email,
      passwordHash,
      name: name || null,
    });

    return res.json({
      ok: true,
      data: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !EMAIL_REGEX.test(String(email))) {
      return res
        .status(400)
        .json({ ok: false, error: { message: "invalid email" } });
    }

    if (!password) {
      return res
        .status(400)
        .json({ ok: false, error: { message: "password required" } });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ ok: false, error: { message: "invalid credentials" } });
    }

    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) {
      return res
        .status(401)
        .json({ ok: false, error: { message: "invalid credentials" } });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );

    return res.json({
      ok: true,
      data: {
        token,
        user: { id: user.id, email: user.email, name: user.name },
      },
    });
  } catch (err) {
    return next(err);
  }
};

const me = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ ok: false, error: { message: "unauthorized" } });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res
        .status(401)
        .json({ ok: false, error: { message: "unauthorized" } });
    }

    return res.json({
      ok: true,
      data: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { register, login, me };
