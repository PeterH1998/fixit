export async function apiGet(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(HTTP );
  return res.json();
}
