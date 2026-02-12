import fs from "fs";
import path from "path";

const OUT_PATH = path.join(process.cwd(), "public", "data", "shots_sample.json");
const N = 500;

// Court bounds (feet, hoop-centered)
const X_MIN = -25;
const X_MAX = 25;
const Y_MIN = 0;
const Y_MAX = 47;

// Helpers
const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const choiceWeighted = (items) => {
  const total = items.reduce((s, it) => s + it.w, 0);
  let r = Math.random() * total;
  for (const it of items) {
    r -= it.w;
    if (r <= 0) return it;
  }
  return items[items.length - 1];
};

// Simple gaussian-ish (sum of uniforms)
const gauss = (mean, sd) => {
  const u = (Math.random() + Math.random() + Math.random() + Math.random()) / 4; // ~N
  return mean + (u - 0.5) * 2 * sd;
};

// Zones: return {x,y,shotType,zone,makeProb}
function sampleZone() {
  // weights roughly match modern NBA volume (3s + rim heavy)
  const z = choiceWeighted([
    { name: "restricted_area", w: 22 },
    { name: "paint_non_ra", w: 16 },
    { name: "midrange", w: 14 },
    { name: "corner_3", w: 16 },
    { name: "above_break_3", w: 32 },
  ]);

  let x, y, shotType, makeProb;

  if (z.name === "restricted_area") {
    // close to hoop: radius ~ 0–4 ft
    const r = rand(0, 4);
    const theta = rand(-Math.PI, Math.PI);
    x = r * Math.cos(theta);
    y = Math.abs(r * Math.sin(theta)); // keep y >= 0
    shotType = "2PT";
    makeProb = rand(0.58, 0.72);
  }

  if (z.name === "paint_non_ra") {
    // paint but not at rim: roughly x within lane, y 4–19
    x = gauss(0, 6);
    y = rand(4, 19);
    shotType = "2PT";
    makeProb = rand(0.40, 0.55);
  }

  if (z.name === "midrange") {
    // midrange: y ~ 14–23, x spread
    x = gauss(0, 10);
    y = rand(14, 24);
    shotType = "2PT";
    makeProb = rand(0.38, 0.48);
  }

  if (z.name === "corner_3") {
    // corner 3: x near ±22, y 0–14
    const side = Math.random() < 0.5 ? -1 : 1;
    x = side * rand(21, 24.5);
    y = rand(0, 14);
    shotType = "3PT";
    makeProb = rand(0.34, 0.44);
  }

  if (z.name === "above_break_3") {
    // above-the-break 3: radius ~ 23.75, y >= 14
    // sample angle that keeps y>=14
    // Use polar-ish then clamp
    const r = rand(22.5, 26);
    const theta = rand(-2.2, 2.2); // wide arc
    x = r * Math.sin(theta);
    y = r * Math.cos(theta);
    if (y < 14) y = rand(14, 30);
    shotType = "3PT";
    makeProb = rand(0.32, 0.40);
  }

  // clamp to court bounds
  x = clamp(x, X_MIN, X_MAX);
  y = clamp(y, Y_MIN, Y_MAX);

  return { x, y, shotType, zone: z.name, makeProb };
}

// Players: give each player slightly different tendencies
const players = [
  { name: "Stephen Curry", team: "GSW", threeBoost: 0.05, rimBoost: -0.02 },
  { name: "LeBron James", team: "LAL", threeBoost: -0.01, rimBoost: 0.06 },
  { name: "Kevin Durant", team: "PHX", threeBoost: 0.00, rimBoost: 0.00, midBoost: 0.06 },
  { name: "Luka Doncic", team: "DAL", threeBoost: 0.03, rimBoost: 0.00 },
];

function pickPlayer() {
  return players[Math.floor(Math.random() * players.length)];
}

function adjustMakeProb(base, zone, p) {
  let prob = base;

  if (zone.includes("3")) prob += p.threeBoost ?? 0;
  if (zone.includes("restricted") || zone.includes("paint")) prob += p.rimBoost ?? 0;
  if (zone.includes("midrange")) prob += p.midBoost ?? 0;

  return clamp(prob, 0.2, 0.85);
}

// Generate shots
const season = "2023-24";
const shots = [];

for (let i = 0; i < N; i++) {
  const p = pickPlayer();
  const z = sampleZone();
  const makeProb = adjustMakeProb(z.makeProb, z.zone, p);

  shots.push({
    id: String(i),
    player: p.name,
    team: p.team,
    season,
    x: Number(z.x.toFixed(2)),
    y: Number(z.y.toFixed(2)),
    made: Math.random() < makeProb,
    shotType: z.shotType,
    zone: z.zone,
  });
}

// Ensure output directory exists
fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, JSON.stringify(shots, null, 2), "utf8");

console.log(`Wrote ${shots.length} shots to ${OUT_PATH}`);
