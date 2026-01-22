export default function ShotChart({ shots = [] }) {
  return (
    <>
      {shots.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r="6"
          fill={s.made ? "green" : "red"}
          opacity="0.85"
        />
      ))}
    </>
  );
}
