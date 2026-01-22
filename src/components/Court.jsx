export default function Court({ width = 700, height = 470, children }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 500 470"
      role="img"
      aria-label="Basketball half court"
    >
      {/* Outer boundary */}
      <rect x="0" y="0" width="500" height="470" fill="white" stroke="black" />

      {/* Hoop (rim) */}
      <circle cx="250" cy="60" r="7.5" fill="none" stroke="black" />

      {/* Backboard */}
      <line x1="220" y1="47" x2="280" y2="47" stroke="black" />

      {/* Paint (the key) */}
      <rect x="190" y="0" width="120" height="190" fill="none" stroke="black" />

      {/* Free throw circle (top half) */}
      <path
        d="M 190 190 A 60 60 0 0 0 310 190"
        fill="none"
        stroke="black"
      />

      {/* Restricted area arc */}
      <path
        d="M 210 60 A 40 40 0 0 0 290 60"
        fill="none"
        stroke="black"
      />

      {/* Three-point line (corners + arc) */}
      <line x1="30" y1="0" x2="30" y2="140" stroke="black" />
      <line x1="470" y1="0" x2="470" y2="140" stroke="black" />
      <path
        d="M 30 140 A 220 220 0 0 0 470 140"
        fill="none"
        stroke="black"
      />

      {/* overlay layer*/}
      {children}
    </svg>
  );
}
