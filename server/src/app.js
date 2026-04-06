const express = require("express");
const cors = require("cors");
const healthRoutes = require("./routes/health.routes");
const devicesRoutes = require("./routes/devices.routes");
const repairsRoutes = require("./routes/repairs.routes");
const bookingsRoutes = require("./routes/bookings.routes");
const catalogRoutes = require("./routes/catalog.routes");
const authRoutes = require("./routes/auth.routes");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const { attachDb } = require("./db");

const app = express();
const defaultOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
const configuredOrigins = (process.env.CLIENT_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = new Set(
  configuredOrigins.length ? configuredOrigins : defaultOrigins
);
const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    const err = new Error("CORS origin not allowed");
    err.status = 403;
    return callback(err);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.set("trust proxy", 1);
app.use(express.json());
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(requestLogger);
attachDb(app);

app.use("/api", healthRoutes);
app.use("/api", authRoutes);
app.use("/api", catalogRoutes);
app.use("/api", devicesRoutes);
app.use("/api", repairsRoutes);
app.use("/api", bookingsRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
