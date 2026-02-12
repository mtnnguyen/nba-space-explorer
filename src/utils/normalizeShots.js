function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function toMade(v) {
  // Accept booleans
  if (typeof v === "boolean") return v;

  // Accept numbers (0/1)
  if (typeof v === "number") return v === 1;

  // Accept strings like "1", "0", "true", "false"
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (s === "1" || s === "true" || s === "made" || s === "yes") return true;
    if (s === "0" || s === "false" || s === "miss" || s === "missed" || s === "no")
      return false;
  }

  // Fallback
  return false;
}

export function normalizeShots(shots) {
  return shots.map((s, i) => ({
    id: s.id ?? String(i),
    player: s.player ?? s.player_name ?? s.playerName ?? "Unknown",
    team: s.team ?? s.team_abbr ?? s.teamAbbr ?? "UNK",
    season: s.season ?? s.season_year ?? s.seasonYear ?? "Unknown",
    x: toNumber(s.x ?? s.loc_x ?? s.shot_x),
    y: toNumber(s.y ?? s.loc_y ?? s.shot_y),
    made: toMade(s.made ?? s.shot_made_flag ?? s.fg_made),
    shotType: s.shotType ?? s.shot_type ?? s.shotTypeBasic ?? "2PT",
  }));
}
