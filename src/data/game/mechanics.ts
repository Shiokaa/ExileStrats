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

export const MECHANICS: Record<MechanicKey, { name: string; color: string; icon: string }> = {
  harvest: { name: 'Harvest', color: '#2F7FE0', icon: '/poe1_mechanic_icons/harvestPortal.webp' },
  breach: { name: 'Breach', color: '#7C5AE0', icon: '/poe1_mechanic_icons/breach.webp' },
  legion: { name: 'Legion', color: '#C9972B', icon: '/poe1_mechanic_icons/legionInitiator.webp' },
  essence: { name: 'Essence', color: '#1F9E9A', icon: '/poe1_mechanic_icons/essence.webp' },
  blight: { name: 'Blight', color: '#3E9E4F', icon: '/poe1_mechanic_icons/blightCore.webp' },
  ritual: { name: 'Ritual', color: '#C0392B', icon: '/poe1_mechanic_icons/ritualRune.webp' },
  expedition: {
    name: 'Expedition',
    color: '#B07B3E',
    icon: '/poe1_mechanic_icons/expeditionDetonator.webp',
  },
  ambush: { name: 'Ambush', color: '#8A5A3C', icon: '/poe1_mechanic_icons/strongbox.webp' },
  delirium: {
    name: 'Delirium',
    color: '#9AA0A8',
    icon: '/poe1_mechanic_icons/deliriumInitiator.webp',
  },
};
