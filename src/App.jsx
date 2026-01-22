import Court from "./components/Court"
import ShotChart from "./components/ShotChart";
import { sampleShots } from "./data/shots.sample";
import { useMemo, useState } from "react";
import Controls from "./components/Controls";

export default function App() {
  const [showMade, setShowMade] = useState(true);
  const [showMissed, setShowMissed] = useState(true);
  const filteredShots = useMemo(() => {
    return sampleShots.filter((s) => (s.made ? showMade : showMissed));
  }, [showMade, showMissed]);

  return (
    <div style={{ padding: 16, fontFamily: "system-ui, Arial" }}>
      <h1>NBA Space Explorer 🏀</h1>
      <p>Interactive court maps coming soon...</p>
    
    <Controls
        showMade={showMade}
        setShowMade={setShowMade}
        showMissed={showMissed}
        setShowMissed={setShowMissed}
      />
    
    <Court>
      <ShotChart shots={filteredShots} />
    </Court>
    </div>
  );
}
