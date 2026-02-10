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

  // Start with your JS sample so the app always works (offline / no fetch issues)
  const [shots, setShots] = useState(() => normalizeShots(sampleShots));
  const [dataStatus, setDataStatus] = useState("Using JS sample");

  // Try loading public JSON; if it fails, keep JS sample
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

  const filteredShots = useMemo(() => {
    return shots.filter((s) => (s.made ? showMade : showMissed));
  }, [shots, showMade, showMissed]);

  return (
    <div style={{ padding: 16, fontFamily: "system-ui, Arial" }}>
      <h1>NBA Space Explorer 🏀</h1>
      <p>Interactive court maps coming soon...</p>

      <small style={{ opacity: 0.7, display: "block", marginBottom: 8 }}>
        {dataStatus}
      </small>

      <Controls
        showMade={showMade}
        setShowMade={setShowMade}
        showMissed={showMissed}
        setShowMissed={setShowMissed}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Court>
          <ShotChart shots={filteredShots} />
        </Court>
      </div>
    </div>
  );
}
