// Example for now
export function normalizeShots(shots) {
  return shots.map((s, i) => ({
    id: s.id ?? String(i),
    player: s.player ?? s.player_name ?? "Unknown",
    team: s.team ?? s.team_abbr ?? "UNK",
    season: s.season ?? "Unknown",
    x: Number(s.x),
    y: Number(s.y),
    made: Boolean(s.made),
    shotType: s.shotType ?? s.shot_type ?? "2PT",
  }));
}
