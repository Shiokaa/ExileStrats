import type { Difficulty, MechanicKey, Tier } from './types';

/** Canonical per-mechanic colours (design_handoff — fixed, identical light/dark). */
export const MECHANICS: Record<MechanicKey, { name: string; color: string }> = {
  harvest: { name: 'Harvest', color: '#2F7FE0' },
  breach: { name: 'Breach', color: '#7C5AE0' },
  legion: { name: 'Legion', color: '#C9972B' },
  essence: { name: 'Essence', color: '#1F9E9A' },
  blight: { name: 'Blight', color: '#3E9E4F' },
  ritual: { name: 'Ritual', color: '#C0392B' },
  expedition: { name: 'Expedition', color: '#B07B3E' },
  ambush: { name: 'Ambush', color: '#8A5A3C' },
  delirium: { name: 'Delirium', color: '#9AA0A8' },
};

export const DIFFICULTY: Record<Difficulty, { label: string }> = {
  1: { label: 'Accessible' },
  2: { label: 'Intermediate' },
  3: { label: 'Demanding' },
};

export const TIERS: Record<Tier, { color: string; note: string }> = {
  S: { color: '#C9972B', note: 'Meta' },
  A: { color: '#2F7FE0', note: 'Solid' },
  B: { color: '#3E9E4F', note: 'Comfort' },
  C: { color: '#8A8E99', note: 'Niche' },
};
