const express = require("express");
const healthRoutes = require("./routes/health.routes");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const { attachDb } = require("./db");

const app = express();
app.use(express.json());
app.use(requestLogger);
attachDb(app);

app.use("/api", healthRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
