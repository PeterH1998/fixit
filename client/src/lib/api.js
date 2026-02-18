const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function api(path, options = {}) {
  const { method = "GET", body, token } = options;
  const headers = { "Content-Type": "application/json" };

  const authToken = token || localStorage.getItem("token");
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message =
      data?.error?.message || data?.message || res.statusText || "Request failed";
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}
