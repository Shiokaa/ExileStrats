'use client';

import { useTheme } from 'next-themes';

/**
 * Both icons are rendered; CSS picks the right one from `[data-theme]` on <html>
 * (set by next-themes before paint) — no mounted state, no hydration mismatch.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="icon-btn"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <svg
        className="theme-icon theme-icon--sun"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4.5" />
        <line x1="12" y1="2.5" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="21.5" />
        <line x1="2.5" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="21.5" y2="12" />
        <line x1="5.3" y1="5.3" x2="7" y2="7" />
        <line x1="17" y1="17" x2="18.7" y2="18.7" />
        <line x1="5.3" y1="18.7" x2="7" y2="17" />
        <line x1="17" y1="7" x2="18.7" y2="5.3" />
      </svg>
      <svg
        className="theme-icon theme-icon--moon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.5 14.2A8.3 8.3 0 1 1 10 3.6a6.6 6.6 0 0 0 10.5 10.6z" />
      </svg>
    </button>
  );
}
