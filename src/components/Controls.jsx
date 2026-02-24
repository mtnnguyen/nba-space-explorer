export default function Controls({
  showMade,
  setShowMade,
  showMissed,
  setShowMissed,
  players = ["All"],
  selectedPlayer = "All",
  setSelectedPlayer = () => {},
}) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
      <label>
        <input
          type="checkbox"
          checked={showMade}
          onChange={(e) => setShowMade(e.target.checked)}
        />{" "}
        Made
      </label>

      <label>
        <input
          type="checkbox"
          checked={showMissed}
          onChange={(e) => setShowMissed(e.target.checked)}
        />{" "}
        Missed
      </label>

      <label style={{ marginLeft: 8 }}>
        Player{" "}
        <select
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
        >
          {(players ?? ["All"]).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
