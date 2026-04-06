const createRateLimit = ({
  windowMs,
  maxRequests,
  message = "Too many requests, please try again later.",
}) => {
  const hits = new Map();

  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip || req.headers["x-forwarded-for"] || "unknown";
    const entry = hits.get(key);

    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (entry.count >= maxRequests) {
      const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
      res.set("Retry-After", String(retryAfterSeconds));
      return res.status(429).json({ ok: false, error: { message } });
    }

    entry.count += 1;
    return next();
  };
};

module.exports = { createRateLimit };
