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
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const corsOptions = {
  origin: clientOrigin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

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
