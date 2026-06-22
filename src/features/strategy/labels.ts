import type { Difficulty, Tier } from './types';

/** Display labels — UI is English-first (DECISIONS.md D23). */
export const DIFFICULTY: Record<Difficulty, string> = {
  1: 'Accessible',
  2: 'Intermediate',
  3: 'Demanding',
};

export const TIER_NOTE: Record<Tier, string> = {
  S: 'Meta',
  A: 'Solid',
  B: 'Comfort',
  C: 'Niche',
};
