export default function Controls({ showMade, setShowMade, showMissed, setShowMissed }) {
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
    </div>
  );
}
