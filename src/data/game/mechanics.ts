/**
 * Static game data — PoE 1 mapping mechanics.
 * Canonical per-mechanic colours are fixed by the design system (DECISIONS.md D27),
 * identical in light and dark themes. Once the ingestion pipeline lands, this moves
 * under data/game/leagues/<league>/ and is resolved by id + leagueVersion (Principe V).
 */
export const MECHANIC_KEYS = [
  'harvest',
  'breach',
  'legion',
  'essence',
  'blight',
  'ritual',
  'expedition',
  'ambush',
  'delirium',
] as const;

export type MechanicKey = (typeof MECHANIC_KEYS)[number];

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
