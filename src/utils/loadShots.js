export async function loadShotsFromPublic(path = "/data/shots_sample.json") {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}
