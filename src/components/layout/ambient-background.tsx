/** Faint Atlas-of-Worlds line motif behind everything (no blur, no photo). */
export function AmbientBackground() {
  return (
    <div className="atlas-bg" aria-hidden="true">
      <svg preserveAspectRatio="xMidYMid slice" viewBox="0 0 1000 700">
        <line x1="120" y1="90" x2="320" y2="180" />
        <line x1="320" y1="180" x2="260" y2="400" />
        <line x1="320" y1="180" x2="560" y2="120" />
        <line x1="560" y1="120" x2="760" y2="240" />
        <line x1="760" y1="240" x2="880" y2="120" />
        <line x1="260" y1="400" x2="480" y2="520" />
        <line x1="480" y1="520" x2="700" y2="470" />
        <line x1="700" y1="470" x2="760" y2="240" />
        <line x1="480" y1="520" x2="420" y2="660" />
        <line x1="700" y1="470" x2="860" y2="600" />
        <circle cx="120" cy="90" r="4" />
        <circle cx="320" cy="180" r="5" />
        <circle cx="560" cy="120" r="4" />
        <circle cx="760" cy="240" r="5" />
        <circle cx="880" cy="120" r="3" />
        <circle cx="260" cy="400" r="4" />
        <circle cx="480" cy="520" r="5" />
        <circle cx="700" cy="470" r="4" />
        <circle cx="420" cy="660" r="3" />
        <circle cx="860" cy="600" r="4" />
      </svg>
    </div>
  );
}
