import Court from "./components/Court";
import ShotChart from "./components/ShotChart";
import Controls from "./components/Controls";

import { useEffect, useMemo, useState } from "react";

import { sampleShots } from "./data/shots.sample";
import { loadShotsFromPublic } from "./utils/loadShots";
import { normalizeShots } from "./utils/normalizeShots";

export default function App() {
  const [showMade, setShowMade] = useState(true);
  const [showMissed, setShowMissed] = useState(true);

  const [selectedPlayer, setSelectedPlayer] = useState("All");

  const [shots, setShots] = useState(() => normalizeShots(sampleShots));
  const [dataStatus, setDataStatus] = useState("Using JS sample");

  useEffect(() => {
    (async () => {
      try {
        const raw = await loadShotsFromPublic("/data/shots_sample.json");
        const normalized = normalizeShots(raw);
        setShots(normalized);
        setDataStatus(`Loaded ${normalized.length} shots from /public/data`);
      } catch (err) {
        console.warn("Falling back to JS sampleShots:", err);
        setDataStatus("Using JS sample (public data failed to load)");
      }
    })();
  }, []);

  const players = useMemo(() => {
    const unique = Array.from(new Set(shots.map((s) => s.player).filter(Boolean)));
    unique.sort();
    return ["All", ...unique];
  }, [shots]);

  const filteredShots = useMemo(() => {
    return shots.filter((s) => {
      if (s.made && !showMade) return false;
      if (!s.made && !showMissed) return false;
      if (selectedPlayer !== "All" && s.player !== selectedPlayer) return false;
      return true;
    });
  }, [shots, showMade, showMissed, selectedPlayer]);

  return (
    <div style={{ padding: 16, fontFamily: "system-ui, Arial" }}>
      <h1>NBA Space Explorer 🏀</h1>
      <p>Interactive court maps coming soon...</p>

      <small style={{ opacity: 0.7, display: "block", marginBottom: 8 }}>
        {dataStatus} • Showing {filteredShots.length} / {shots.length}
      </small>

      <Controls
        showMade={showMade}
        setShowMade={setShowMade}
        showMissed={showMissed}
        setShowMissed={setShowMissed}
        players={players}
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Court>
          <ShotChart shots={filteredShots} />
        </Court>
      </div>
    </div>
  );
}
