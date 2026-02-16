const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const isDev = process.env.NODE_ENV !== "production";

  if (process.env.NODE_ENV !== "test") {
    console.error(err);
  }

  const details = isDev && err.stack ? { stack: err.stack } : undefined;
  const payload = { ok: false, error: { message } };
  if (details) {
    payload.error.details = details;
  }

  res.status(status).json(payload);
};

module.exports = errorHandler;
