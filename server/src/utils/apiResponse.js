const ok = (res, data, meta) => {
  const payload = { ok: true, data };
  if (meta !== undefined) {
    payload.meta = meta;
  }
  return res.json(payload);
};

const fail = (res, status, message, details) => {
  const payload = { ok: false, error: { message } };
  if (details !== undefined) {
    payload.error.details = details;
  }
  return res.status(status).json(payload);
};

module.exports = { ok, fail };
