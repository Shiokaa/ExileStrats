/** ExileStrats glyph — branching graph (design_handoff). */
export function LogoMark({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="4.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 23.5 V28 Q21 34 26 34" />
      <path d="M43 23.5 V28 Q43 34 38 34" />
      <path d="M32 40 V44.5" />
      <rect x="15.5" y="12.5" width="11" height="11" rx="3" />
      <rect x="37.5" y="12.5" width="11" height="11" rx="3" />
      <circle cx="32" cy="34" r="6" />
      <rect x="26.5" y="44.5" width="11" height="11" rx="3" />
    </svg>
  );
}
