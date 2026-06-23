import type { CSSProperties } from 'react';

/** Set CSS custom properties as a style object, e.g. cssVars({ '--mech': color }). */
export function cssVars(vars: Record<string, string>): CSSProperties {
  return vars as CSSProperties;
}

/** Join class names, dropping falsy values. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** "~2.4 div / h" — estimated return, always shown in neutral text (anti-hype, Principe IX). */
export function formatReturn(divPerHour: number): string {
  return `~${divPerHour.toFixed(1)} div / h`;
}

/** "~12c / map" — investment per map. */
export function formatInvest(chaosPerMap: number): string {
  return `~${Math.round(chaosPerMap)}c / map`;
}

/** "updated 2d ago" — relative update label. */
export function formatUpdated(daysAgo: number): string {
  if (daysAgo <= 0) return 'updated today';
  if (daysAgo === 1) return 'updated 1d ago';
  return `updated ${daysAgo}d ago`;
}
