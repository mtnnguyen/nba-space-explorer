import Court from "./components/Court"
import ShotChart from "./components/ShotChart";
import { sampleShots } from "./data/shots.sample";

export default function App() {
  return (
    <div style={{ padding: 16, fontFamily: "system-ui, Arial" }}>
      <h1>NBA Space Explorer 🏀</h1>
      <p>Interactive court maps coming soon...</p>
    <Court>
      <ShotChart shots={sampleShots} />
    </Court>
    </div>
  );
}
