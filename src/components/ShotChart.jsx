const HOOP_X = 250;
const HOOP_Y = 60;
const PX_PER_FT = 10; // 500px / 50ft

function feetToSvg(xFt, yFt) {
  return {
    cx: HOOP_X + xFt * PX_PER_FT,
    cy: HOOP_Y + yFt * PX_PER_FT,
  };
}

export default function ShotChart({ shots = [] }) {
  return (
    <>
      {shots.map((s) => {
        const x = Number(s.x);
        const y = Number(s.y);
        const { cx, cy } = feetToSvg(x, y);

        return (
          <circle
            key={s.id}
            cx={cx}
            cy={cy}
            r="6"
            fill={s.made ? "green" : "red"}
            opacity="0.85"
          />
        );
      })}
    </>
  );
}
